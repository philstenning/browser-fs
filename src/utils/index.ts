export { createVirtualDirectory, selectDirectoryOnUsersFileSystem } from "./fs";
export {
  checkPermissionsOfHandle,
  getSavedHandles,
  getSavedHandlesWithPermission,
} from "./handles";
export { scanLocalDriveRecursively } from "./scanDirectory";
export { browserCheck } from "./features";
export type { VirtualDirectory, VirtualFileSystemHandle } from "./types";
export { excludedFolders } from "./excludedFolders";
