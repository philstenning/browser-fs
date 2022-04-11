export { createDirectory } from "./models/directories/createDirectory";
export { createRootDbDirectory } from "./models/directories/createRootDbDirectory";
export { deleteRootDbDirectoryAndFiles } from "./models/directories/deleteRootDbDirectoryAndFiles";

export {
  createFile,
  deleteFile,
  deleteFiles,
  deleteRootFolderFiles,
  saveFile,
  saveFiles,
  updateFile,
} from "./models/file/";

export {
  createCollection,
  deleteCollection,
  updateCollection,
  addFileToCollection,
  removeFileFromCollection,
  removeAllFilesFromCollection
} from "./models/collections/";

export { parseVirtualFileSystemEntry } from "./models/parseVirtualFsaEntry";
export { db, initializeDb } from "./db/setup";
export { useLiveQuery } from "dexie-react-hooks";
export * from "./models/types";
