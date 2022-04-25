/**
 * Check to see if we have been granted permissions to the folders
 * Note! The user need to do some sort of action to invoke this function
 * or it will throw an error silently and is difficult to debug.
 * @returns boolean; false if denied by user
 */
async function checkPermissionsOfHandle(
  handle: FileSystemDirectoryHandle | FileSystemFileHandle,
  mode: FileSystemPermissionMode = "read"
) {
  //type PermissionState = "denied" | "granted" | "prompt"
  try {
    let permission = await handle.queryPermission({ mode });
    if (permission === "prompt") {
      permission = await handle.requestPermission({ mode });
    }
    if (permission === "granted") {

      
      return true;
    }
  } catch (e) {
    console.error(`Error Getting permission for handle ${e}`);
  }

  // user clicked: do not allow.
  console.error("User denied access to handle.");
  return false;
}

export { checkPermissionsOfHandle };
