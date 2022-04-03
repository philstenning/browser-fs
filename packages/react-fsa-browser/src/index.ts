export {
  RootDirectoryProvider,
  useRootDirectoryContext,
} from "./context/root-directory-context";

export type { RootDirectoryContextType } from "./context/root-directory-context";

// re-export from lib
export type {VirtualFileSystemEntry,VirtualRootDirectory} from 'fsa-browser'
