/*  --------- Types  ---------  */
import type {
  FsaDbContextType,
  FsaDbContextProviderProps,
} from './context/dbContext'

import type {
  fsaFile,
  fsaState,
  fsaCollection,
  fsaExcludedDirectory,
  fsaFileType,
  fsaCollectionFile,
  fsaSetting,
  fsaDirectory,
} from '@philstenning/fsa-database'

import type { DuplicateFile } from './hooks/files/useFindDuplicateFiles'
import FsaDbContextProvider from './context/dbContext'

/*  --------- Hooks  ---------  */
// context
import useFsaDbContext from './hooks/context/useFsaDbContext'
// collections
import useCollections from './hooks/collections/useCollections'
// directories
import useDirectories from './hooks/directories/useDirectories'
// excluded directories
import useExcludedDirectories from './hooks/excludedDirectories/useExcludedDirectories'
// files
import useCurrentFile from './hooks/files/useCurrentFile'
import useCurrentDirectory from './hooks/files/useDirectoryFiles'
import useFindDuplicateFiles from './hooks/files/useFindDuplicateFiles'
import useRootFileList from './hooks/files/useRootFileList'
// fileTypes
import useFileTypesNames from './hooks/fileTypes/useFileTypesNames'
import useFileTypes from './hooks/fileTypes/useFileTypes'
// root directories
import useRootDirectories from './hooks/rootDirectories/useRootDirectories'
// settings
import useSettings from './hooks/settings/useSettings'

export {
  // context
  FsaDbContextProvider,
  FsaDbContextProviderProps,
  useFsaDbContext,
  // files
  useCurrentFile,
  useCurrentDirectory,
  useFindDuplicateFiles,
  useRootFileList,
  // file types
  useFileTypes,
  useFileTypesNames,
  // root directories
  useRootDirectories,
  useExcludedDirectories,
  useDirectories,
  useCollections,
  useSettings,
}

export type {
  FsaDbContextType,
  DuplicateFile,
  // reexports
  fsaFile,
  fsaState,
  fsaCollection,
  fsaExcludedDirectory,
  fsaFileType,
  fsaCollectionFile,
  fsaSetting,
  fsaDirectory,
}
