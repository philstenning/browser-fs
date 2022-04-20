
// export {
//   deleteAllVirtualRootDirectories,
//   deleteVirtualRootDirectory,
//   getAllVirtualRootDirectories,
//   getAllVirtualRootDirectoriesAndCheckPermissions,
//   saveVirtualRootDirectory,
//   updateVirtualRootDirectory,
//   orderDirectoriesByDate
// } from "./virtualRootDirectories";

export {
  checkPermissionsOfHandle,
  createVirtualRootDirectory,
  scanLocalDrive,
  selectRootDirectoryOnLocalDrive,
} from "./fileSystemOperations";


export {browserCheck} from './browserFeatureCheck'
export {FoldersToExcludeFromScanning} from './excludedFolders'
export type { VirtualFileSystemEntry } from "./fileSystemOperations/types";
export type { VirtualRootDirectoryType, RootDirOrderType } from "./virtualRootDirectories/types";
