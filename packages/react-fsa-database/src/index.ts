// context
export { FsaDbContextProvider, useFsaDbContext } from "./context/dbContext";

export type { FsaDbContextType } from "./context/dbContext";

// re-export from fsa-browser
export type {
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
} from "fsa-browser";

// Hooks
export * from "./hooks/fileTypes";
export {
  useRootFileList,
  useDirectoryFiles,
  useFindDuplicateFiles,
} from "./hooks/files";

export {
  useRootDirectories,
  useAddRootDirectory,
  useReScanRootDirectories,
} from "./hooks/rootDirectories";

export { useDirectories } from "./hooks/directories/useDirectories";
export { useCollections } from "./hooks/collections/useCollections";
