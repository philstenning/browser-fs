import { VirtualRootDirectoryType } from "../virtualRootDirectories/types";
import md5 from 'md5'

/**
 * Select a Directory (this will be known as the root directory) on 
 * the users local file system.
 *@returns Promise VirtualDirectory object or null VirtualDirectory if user cancels.
 *@param dirPath optional absolute path on users drive to folder.
 */
export async function selectRootDirectoryOnLocalDrive(
  dirPath = "/"
): Promise<VirtualRootDirectoryType | null> {
  try {
    // we get back a dirHandle or undefined if user cancels the dialog.
    const dirHandle = await window.showDirectoryPicker({});
    // we only want a folder not files
    if (dirHandle.kind === "directory") {
      // create the Folder object to be saved in db.
      return createVirtualRootDirectory(dirHandle, dirPath, true);
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    return null;
  }
  return null;
}

/**
 * Creates a virtual Directory object from FileSystemDirectoryHandle
 * @param dirHandle 
 * @param filePath 
 * @param isRoot 
 * @param rootId 
 * @param parts 
 * @returns IVirtualDirectory Object
 */
export  function createVirtualRootDirectory(
  dirHandle: FileSystemDirectoryHandle,
  filePath: string = "/",
  isRoot: boolean = false,
  rootId: string = "",
  parts: number = 0
): VirtualRootDirectoryType {
  const createdAt = new Date();
  const { name } = dirHandle;
  // TODO perhaps we should use a guid.
  // the id uses the current time to generate a unique id,
  // as we could have multiple folders with the same name.
  const folder: VirtualRootDirectoryType = {
    id: md5(name + createdAt.toISOString()),
    handle: dirHandle,
    created: createdAt,
    updated: createdAt,
    name: name,
    filePath,
    hasReadPermission: true,
  };
  return folder;
}