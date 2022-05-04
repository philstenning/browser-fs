import { db, getExcludedFoldersList } from "../..";
import {
  checkPermissionsOfHandle,
  scanLocalDrive,
  VirtualFileSystemEntry,
} from "fsa-browser";
import { createDirectory } from "../directories/createDirectory";
import { createFile, saveFile, bytesToSize } from "../files";
import { removeFileFromAllCollection } from "../collections";
import { fsaDirectory } from "../types";
import { saveState, getCurrentState } from "../state";
import { updateSettingLastScanned } from "../settings";

export async function rescanRootDirectories() {
  const state = await getCurrentState();
  await saveState({ ...state, isScanning: true });
  await rescan();
  await updateSettingLastScanned();
  await saveState({ ...state, isScanning: false });
  // console.log("scanning finished");
}

/**
 * Re-scan all the root directories we have in the db.
 */
async function rescan() {
  const lastChecked = Date.now();

  // get root all dirs

  const rootDirs = await db.directories
    .where("isRoot")
    .equals("true")
    .toArray();

  // get the file extensions we want to look for.
  const fileExtensions = (await db.fileTypes.toArray()).map((t) => t.name);

  // check all handles now!
  // if we do this later some will fail
  // because we need a user interaction and this
  // must be reset after a period of time.
  for (const currentDir of rootDirs) {
    const result = await checkPermissionsOfHandle(currentDir.handle);
    if (!result) {
      console.log(`skipped scanning for ${currentDir.name}`);
      continue; //  skip this handle it will fail.
    }
    currentDir.readPermission = "true";
    currentDir.scanFinished = false;
    await db.directories.put(currentDir);
  }
  // check how long scan takes
  console.time("reScanDirectories");

  for (const currentDir of rootDirs) {
    // console.log(`scan of dir ${currentDir.name} started`);
    // console.timeLog("reScanDirectories");
    // check permissions of handles
    // we have already done this but if the user
    // clicked cancel we don't get a chance to re-do
    const result = await checkPermissionsOfHandle(currentDir.handle);
    if (!result) {
      console.log(`skipped scanning for ${currentDir.name}`);
      continue; //  skip this handle it will fail.
    }

    // let the user know we are scanning this dir.
    currentDir.isScanning = true;
    currentDir.scanFinished = false;
    currentDir.readPermission = "true";
    await db.directories.put(currentDir);

    // directories we don't want to scan.
    const excludedFolders = await getExcludedFoldersList();

    //👍 call scanLocalDrive for  handle
    const virtualFileSystemEntry = await scanLocalDrive(
      currentDir.handle,
      fileExtensions,
      100,
      excludedFolders
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
    const removedDirs = (
      await db.directories.where({ rootId: currentDir.id }).toArray()
    ).filter((d) => d.lastChecked !== lastChecked);

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

    // find out how many dirs under this root dir
    // haven't been updated  - these need to be removed.
    const count = (
      await db.directories.where({ rootId: currentDir.id }).toArray()
    ).filter((d) => d.lastChecked !== lastChecked).length;

    if (count) console.error(` there are still ${count} directories to remove`);

    // we now need to update the dirs props under the
    // current root dir
    await updateDirectoryForRootDir(currentDir);

    // update ui status.
    currentDir.isScanning = false;
    currentDir.scanFinished = true;
    db.directories.put(currentDir);
  }

  console.timeEnd("reScanDirectories");
  // console.log("re-scan all done...👍");
}

async function updateDirectoryForRootDir(currentDir: fsaDirectory) {
  const dirList = await db.directories
    .where("rootId")
    .equals(currentDir.id)
    .toArray();

  // for each directory check file count
  for (const dir of dirList) {
    const files = await db.files.where("parentId").equals(dir.id).toArray();
    dir.fileCount = files.length;
    dir.fileIds = files.map((f) => f.id);
    dir.readPermission = "true";
    await db.directories.put(dir);
  }
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
          const _file = await createFile(
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
        // recheck file size if file has changed
        const fileSize = (await file.handle.getFile()).size;
        file.size = bytesToSize(fileSize);
        // console.log(`${entry.path} 🎉 is same`);
        file.lastChecked = lastChecked;
        await db.files.put(file);
      } else {
        throw new Error(`error re-scanning directory ${entry.name} `);
      }
    } else {
      // we have a directory
      // console.log("👉 Dir", entry.name);

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
        dir.readPermission = "true";
        await db.directories.put(dir);

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
            depth,
            "user",
            "true"
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
