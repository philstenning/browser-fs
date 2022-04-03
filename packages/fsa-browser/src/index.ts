import { formatDiagnostic } from "typescript";

export {
  deleteAllVirtualRootDirectories,
  deleteVirtualRootDirectory,
  getAllVirtualRootDirectories,
  getAllVirtualRootDirectoriesAndCheckPermissions,
  saveVirtualRootDirectory,
  updateVirtualRootDirectory,
  orderDirectoriesByDate
} from "./virtual-root-directories";

export {
  checkPermissionsOfHandle,
  createVirtualRootDirectory,
  scanLocalDriveRecursively,
  selectRootDirectoryOnLocalDrive,
} from "./file-system-operations";


export {browserCheck} from './browser-feature-check'
export {FoldersToExcludeFromScanning} from './excluded-folders'
export type { VirtualFileSystemEntry } from "./file-system-operations/types";
export type { VirtualRootDirectoryType, RootDirOrderType } from "./virtual-root-directories/types";
