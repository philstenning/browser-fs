import { entries } from "idb-keyval";
import { VirtualRootDirectory } from "./types";
import { checkPermissionsOfHandle } from "../file-system-operations";
import { rootStore } from "./stores";

/**
 *  All VirtualFileSystemEntries that have been saved to indexDB are returned
 * @param prependedText  The text you you have prepend all your entries with. Default is empty string.
 */
async function getAllVirtualRootDirectories(prependedText: string = "") {
  try {
    const allEntries = await entries(rootStore);

    const allFolders: VirtualRootDirectory[] = [];
    allEntries.forEach((entry) => {
      if (entry[0].toLocaleString().startsWith(prependedText)) {
        // update the permissions to false and add it to our results.
        const folder = entry[1] as VirtualRootDirectory;
        folder.hasReadPermission = false;
        allFolders.push(folder);
      }
    });
    console.table(allFolders);
    const res = orderDirectoriesByDate(allFolders);
    return res;
  } catch (e) {
    console.error("error getting handles:", e);
  }
  return null;
}

type Order = "asc" | "desc";

function orderDirectoriesByDate(
  directories: VirtualRootDirectory[],
  order: Order = "asc"
) {
  return directories.sort((a, b) => {
    if (order === "asc") {
      return a.created < b.created ? -1 : 1;
    }
    return a.created > b.created ? -1 : 1;
  });
}

async function getAllVirtualRootDirectoriesAndCheckPermissions(
  mode: FileSystemPermissionMode = "read"
) {
  const virtualFileSystemHandles = await getAllVirtualRootDirectories();
  if (!virtualFileSystemHandles) return;

  const checkedHandles: VirtualRootDirectory[] = [];

  for (const virtualFH of virtualFileSystemHandles) {
    virtualFH.hasReadPermission = await checkPermissionsOfHandle(
      virtualFH.handle as FileSystemDirectoryHandle,
      mode
    );
    checkedHandles.push(virtualFH);
  }
  console.log({ checkedHandles });

  return checkedHandles;
}

export {
  getAllVirtualRootDirectories,
  getAllVirtualRootDirectoriesAndCheckPermissions,
  orderDirectoriesByDate,
};