/**
 * Check to see if we have been granted permissions to the folders
 * Note! The user need to do some sort of action to invoke this function
 * or it will throw an error silently and is difficult to debug.
 * @returns {Promise<boolean>} false if denied by user
 */
async function checkPermissionsOfHandle(
  handle: FileSystemDirectoryHandle | FileSystemFileHandle,
  mode: FileSystemPermissionMode = "read"
): Promise<boolean> {
  //type PermissionState = "denied" | "granted" | "prompt"
  if (!handle?.name) {
    console.error(
      `Error the Handle does not exist.\n Did you import the database from file?`
    );
    return false;
  }

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
