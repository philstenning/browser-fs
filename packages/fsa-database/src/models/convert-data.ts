import { VirtualFileSystemEntry } from "fsa-browser";
import { db, fsaDirectory, fsaFile, createDirectory } from "../index";

/**
 * When passed a valid  virtualFileSystemEntry from fsa-browser scanLocalDrive()
 * we convert it into folders and files and save to the database.
 * The assumption is the data has been validated in the scanLocalDrive function and
 * should be valid and have permissions.
 * @param virtualFileSystemEntry
 * @returns true if complected successfully, false if not.
 */
export async function parseVirtualFileSystemEntry(
  virtualFileSystemEntry: VirtualFileSystemEntry,
  rootId: number,
  parentId: number
) {
  //iterate over each entries handle
  const dirs: fsaDirectory[] = [];
  const files: fsaFile[] = [];
  const fileIds:number[] = []

  virtualFileSystemEntry.entries.forEach((entry) => {
    const { handle, path, depth } = entry;

    if (handle.kind === "directory") {
      // convert to fsaDirectory object
      const directory = createDirectory(handle, path, false, rootId,[],depth);
      dirs.push(directory);
    } else {
      // convert to fsaFile object
      //TODO save files
    }
  });

  // once we have processed the directory
  // bulk save to the database.
  const bulkAddNumber = await db.directories.bulkAdd(dirs);
  console.log({ bulkAddNumber });

  await updateParentDirectory(fileIds, parentId);
  // recursively do for each folder in folder.
  //   await parseVirtualFileSystemEntry()
  
  return false;
}

// update the current fsaDirectory object parts property
//  only if we have files to add.
async function updateParentDirectory(fileIds:number[], parentId: number) {
    if (fileIds.length > 0) {
      const parentDir = await db.directories
        .where(":id")
        .equals(parentId)
        .first();

      parentDir.fileIds=fileIds
      parentDir.fileCount= fileIds.length
      // update item in db with a put
      await db.directories.put(parentDir);
    }
}

