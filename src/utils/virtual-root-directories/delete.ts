import { del } from "idb-keyval";
import { VirtualFileSystemEntry } from "../types";
import { rootStore } from "./stores";
async function deleteAllVirtualRootDirectories() {
  throw new Error("not implemented Error");
}

/**
 *
 * @param virtualFileSystemEntry
 * @param prependedText  The text you you have prepend all your entries with.
 * @returns  Promise of Boolean
 */
async function deleteVirtualRootDirectory(
  virtualFileSystemEntry: VirtualFileSystemEntry,
  prependedText: string = "__vfs_entry__"
) {
  try {
    await del(`${prependedText}${virtualFileSystemEntry.name}`, rootStore);
    return true;
  } catch (e) {
    console.log(`error deleting file: ${virtualFileSystemEntry.name}: ${e}`);
  }

  return false;
}

export { deleteAllVirtualRootDirectories, deleteVirtualRootDirectory };
