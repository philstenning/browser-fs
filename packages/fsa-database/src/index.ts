export {
  createRootDirectory,
  deleteRootDirectoryAndFiles,
  reScanRootDirectories,
} from "./models/rootDirectories";

export {
  createDirectory,
  checkDirectoryForFilesInCollections,
  hideDirectoryAndFiles,
} from "./models/directories";

export {
  createFile,
  deleteFile,
  deleteFiles,
  deleteRootFolderFiles,
  saveFile,
  saveFiles,
  updateFile,
} from "./models/files";

export {
  addFileToCollection,
  createCollection,
  deleteCollection,
  updateCollection,
  removeFileFromCollection,
  removeFileFromAllCollection,
  removeAllFilesFromCollection,
  removeFileFromCollectionsSavedLocation,
  saveCollectionToFileSystem,
} from "./models/collections/";

export {
  createSetting,
  updateSetting,
  updateSettingLastScanned,
} from "./models/settings";

export { parseVirtualFileSystemEntry } from "./models/parseVirtualFsaEntry";
export {
  db,
  initializeDatabase,
  exportDatabase,
  importDatabase,
  fetchDatabase,
} from "./db";

export { useLiveQuery } from "dexie-react-hooks";
export * from "./models/types";

// export { DbError } from "./models/errors/dbError";
