import type {
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
} from 'fsa-browser'
import type { FsaDbContextType } from './context/dbContext'
import { FsaDbContextProvider, useFsaDbContext } from './context/dbContext'
import { useFileTypes, useFileTypesNames } from './hooks/fileTypes'
import {
  useRootFileList,
  useDirectoryFiles,
  useFindDuplicateFiles,
} from './hooks/files'
import { useRootDirectories } from './hooks/rootDirectories'
import { useExcludedDirectories } from './hooks/excludedDirectories/useExcludedDirectories'
import { useDirectories } from './hooks/directories/useDirectories'
import { useCollections } from './hooks/collections/useCollections'
import { useSettings } from './hooks/settings/useSettings'

export type {
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
  FsaDbContextType,
}
export {
  FsaDbContextProvider,
  useFsaDbContext,
  useFileTypes,
  useFileTypesNames,
  useRootFileList,
  useDirectoryFiles,
  useFindDuplicateFiles,
  useRootDirectories,
  useExcludedDirectories,
  useDirectories,
  useCollections,
  useSettings,
}
