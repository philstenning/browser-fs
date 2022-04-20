import { db } from "../../db/setup";
import {
  checkPermissionsOfHandle,
  scanLocalDrive,
  VirtualFileSystemEntry,
  FoldersToExcludeFromScanning,
} from "fsa-browser";
import { createDirectory } from "./createDirectory";
import { createFile, saveFile } from "../files";
import { removeFileFromAllCollection } from "../collections";
export async function reScanDirectories() {
  const lastChecked = Date.now();

  // get root all dirs

  const rootDirs = await db.directories
    .where("isRoot")
    .equals("true")
    .toArray();

  const fileExtensions = (await db.fileTypes.toArray()).map((t) => t.name);
 
  for (const currentDir of rootDirs) {
        const result = await checkPermissionsOfHandle(currentDir.handle);
        if (!result) {
          console.log(`skipped scanning for ${currentDir.name}`);
          continue; //  skip this handle it will fail.
        }
 }
  for (const currentDir of rootDirs) {
    // check permissions of handles
    const result = await checkPermissionsOfHandle(currentDir.handle);
    if (!result) {
      console.log(`skipped scanning for ${currentDir.name}`);
      continue; //  skip this handle it will fail.
    }

    //👍 call scanLocalDrive for each handle
    const virtualFileSystemEntry = await scanLocalDrive(
      currentDir.handle,
      fileExtensions,
      100,
      FoldersToExcludeFromScanning
    );
    await checkVirtualFileSystemEntry(
      virtualFileSystemEntry,
      lastChecked,
      currentDir.id,
      currentDir.id
    );
    currentDir.lastChecked = lastChecked;
    await db.directories.put(currentDir);

    // remove all files that have not been updated
    // they don't exist anymore.
    const removedFiles = (
      await db.files.where({ rootId: currentDir.id }).toArray()
    ).filter((f) => f.lastChecked !== lastChecked);
    if (removedFiles.length) {
      for (const fileToRemove of removedFiles) {
        // remove file from collections
        await removeFileFromAllCollection(fileToRemove);
        await db.files.delete(fileToRemove.id);
      }
      const count = (
        await db.files.where({ rootId: currentDir.id }).toArray()
      ).filter((f) => f.lastChecked !== lastChecked);
      if (count.length)
        console.error(` there are still ${count.length} files to remove`);
      count.forEach((f) => console.log(`${f.path} 🤬`));
    }

    /// remove all removed directories
    const removedDirs = (await db.directories
      .where({ rootId: currentDir.id })
      .toArray()).filter(d=>d.lastChecked!== lastChecked)

    for (const dir of removedDirs) {
      const files = await db.files.where("parentId").equals(dir.id).count();
      if (files === 0) {
        await db.directories.delete(dir.id);
      } else {
        console.error(
          `Error can not remove directory ${dir.name} it still has children`
        );
      }
    }
    const count = (await db.directories
      .where({ rootId: currentDir.id })
      .toArray())
      .filter((d) => d.lastChecked !== lastChecked).length
      
    if (count) console.error(` there are still ${count} directories to remove`);

    // for each directory check file count
    const dirList = await db.directories
      .where("rootId")
      .equals(currentDir.id)
      .toArray();

    for (const dir of dirList) {
      const files = await db.files.where("parentId").equals(dir.id).toArray();
      // console.table(files);
      dir.fileCount = files.length;
      dir.fileIds = files.map((f) => f.id);
      await db.directories.put(dir);
    }
  }

  // any files/ dirs not in db need to be added

  // finally
  // get all files where they have not been updated and delete them
  // and remove them from the directory files list and collections
  console.log("re-scan all done...👍");
}

async function checkVirtualFileSystemEntry(
  virtualFileSystemEntry: VirtualFileSystemEntry,
  lastChecked: number,
  rootId: string,
  parentId: string
) {
  const fileIds: string[] = [];

  if (!virtualFileSystemEntry.entries) return;

  //
  for (const entry of virtualFileSystemEntry.entries) {
    /// check file is same
    if (entry.kind === "file") {
      const file = await db.files.where({ rootId, path: entry.path }).first();

      // we don't have a file in the db
      // so create and add one.
      if (!file) {
        if (entry.handle.kind === "file") {
          const _file = createFile(
            entry.handle,
            parentId,
            rootId,
            entry.path ?? "",
            entry.extension,
            entry.name,
            "userId",
            false,
            []
          );
          _file.lastChecked = lastChecked;
          const dbFile = await saveFile(_file);
          if (dbFile?.id) fileIds.push(dbFile.id);
        }
      } else if (await file.handle.isSameEntry(entry.handle)) {
        // console.log(`${entry.path} 🎉 is same`);
        file.lastChecked = lastChecked;
        await db.files.put(file);
      } else {
        throw new Error(`error re-scanning directory ${entry.name} `);
      }
    } else {
      // we have a directory

      // get dirs where root is same
      const rootIdDirs = await db.directories
        .where("rootId")
        .equals(rootId)
        .toArray();
      // then filter by path and take the first one.
      const dir = rootIdDirs.filter((f) => f.path === entry.path)[0];
      //we then  should have the same dir
      if (dir && (await entry.handle.isSameEntry(dir.handle))) {
        dir.lastChecked = lastChecked;
        await db.directories.put(dir);
        // console.log("👉", entry.name);

        await checkVirtualFileSystemEntry(entry, lastChecked, rootId, dir.id);
      } else {
        const { handle, path, depth } = entry;
        if (handle.kind === "directory") {
          const directory = createDirectory(
            handle,
            path ?? "",
            false,
            rootId,
            parentId,
            [],
            depth
          );
          directory.lastChecked = lastChecked;
          const id = await db.directories.add(directory);
          //   console.log(`Directory ${directory.name} found and added to db.`);
          // TODO: show dirs added to user..

          await checkVirtualFileSystemEntry(entry, lastChecked, rootId, id);
        }
      }

      // if it is in the db we need to recheck it.
    }
  }
}
