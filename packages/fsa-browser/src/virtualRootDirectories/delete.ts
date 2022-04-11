import { del, clear } from "idb-keyval";
import { VirtualRootDirectoryType } from "./types";
import { rootStore } from "./stores";

/**
 * Clears all saved VirtualRootDirectories from the store.
 * @returns boolean
 */
async function deleteAllVirtualRootDirectories() {
  try {
    await clear(rootStore);
    return true;
  } catch (e) {
    console.error(`Error clearing rootStore data.`);
  }
  return false;
}

/**
  * deletes the saved VirtualRootDirectories from the store.
 * @param virtualFileSystemEntry
 * @param prependedText  The text you you have prepend all your entries with.
 * @returns  Promise of Boolean
 */
async function deleteVirtualRootDirectory(
  virtualFileSystemEntry: VirtualRootDirectoryType,
  prependedText: string = ""
) {
  try {
    console.log(
      "deleting",
      virtualFileSystemEntry.name,
      virtualFileSystemEntry.id
    );
    await del(`${prependedText}${virtualFileSystemEntry.id}`, rootStore);
    return true;
  } catch (e) {
    console.log(`error deleting file: ${virtualFileSystemEntry.name}: ${e}`);
  }

  return false;
}

export { deleteAllVirtualRootDirectories, deleteVirtualRootDirectory };
