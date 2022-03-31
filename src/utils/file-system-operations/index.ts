export {
  createVirtualRootDirectory,
  selectRootDirectoryOnLocalDrive,
} from "./fs";

export { checkPermissionsOfHandle } from "./permissions";
export { scanLocalDriveRecursively } from "./scanDirectory";
export { browserCheck } from "../browser-feature-check";
export type { VirtualRootDirectory, VirtualFileSystemEntry } from "../types";
export { allFoldersToExcludeFromScanning } from "../excluded-folders";
