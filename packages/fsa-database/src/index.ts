export {
  createDirectory,
  createRootDirectory,
  deleteRootDirectoryAndFiles,
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
  removeAllFilesFromCollection,
  saveCollectionToFileSystem,
} from "./models/collections/";

export { parseVirtualFileSystemEntry } from "./models/parseVirtualFsaEntry";
export { db, initializeDb } from "./db/setup";
export { useLiveQuery } from "dexie-react-hooks";
export * from "./models/types";

// export { DbError } from "./models/errors/dbError";
