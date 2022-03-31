/**
 * Check to see if we have been granted permissions to the folders
 * Note! The user need to do some sort of action to invoke this function
 * or it will throw an error silently and is difficult to debug.
 * @returns boolean; false if denied by user
 */
async function checkPermissionsOfHandle(
  dirHandle: FileSystemDirectoryHandle,
  mode: FileSystemPermissionMode = "read"
) {
  //type PermissionState = "denied" | "granted" | "prompt"
  try {
    let permission = await dirHandle.queryPermission({ mode });
    if (permission === "prompt") {
      permission = await dirHandle.requestPermission({ mode });
    }
    if (permission === "granted") {
      return true;
    }
  } catch (e) {
    console.error(`Error Getting permission for Folder Handle ${e}`);
  }

  // user clicked: do not allow.
  console.error("User denied access to Folder Handle.");
  return false;
}

export { checkPermissionsOfHandle };
