import { lchown } from "fs";
import { get, set, entries } from "idb-keyval";
import { VirtualFileSystemHandle } from "./types";
/**
 * folder Handles that have been saved to indexDB are returned
 */
async function getSavedHandles() {
  try {
    const allEntries = await entries();

    const allFolders: VirtualFileSystemHandle[] = [];
    allEntries.forEach((entry) => {
      if (entry[0].toLocaleString().startsWith("__dir-handle__")) {
        // console.log(entry[0].toLocaleString())
        allFolders.push(entry[1]);
      }
    });
    // console.table(allFolders)
    return allFolders;
  } catch (e) {
    console.error("error getting handles:", e);
  }
  return null;
}

async function getSavedHandlesWithPermission() {
  const handlesWithPermissionGranted: VirtualFileSystemHandle[] = [];
  const virtualFileSystemHandle = await getSavedHandles();
  virtualFileSystemHandle?.forEach(async (handle) => {
    const res = await checkPermissionsOfHandle(
      handle.handle as FileSystemDirectoryHandle
    );
    if (res) handlesWithPermissionGranted.push(handle);
  });
}

/** Check to see if we have been granted permissions to the folders
 * @returns boolean; false if denied by user
 */
async function checkPermissionsOfHandle(dirHandle: FileSystemDirectoryHandle) {
  //type PermissionState = "denied" | "granted" | "prompt"
  try {
    let permission = await dirHandle.queryPermission();
    if (permission === "prompt") {
      permission = await dirHandle.requestPermission({ mode: "read" });
    }
    if (permission === "granted") {
      return true;
    }
  } catch (e) {
    console.error(`Error Getting permission for Folder Handle ${e}`);
  }

  // user clicked do not allow.
  console.log("User denied access to Folder Handle.");
  return false;
}

export {
  checkPermissionsOfHandle,
  getSavedHandles,
  getSavedHandlesWithPermission,
};
