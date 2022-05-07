// db
import { db } from './db/setup'
import deleteDatabase from './db/deleteDatabase'
import exportDatabase from './db/exportDatabase'
import fetchDatabase from './db/fetchDatabase' // use for testing
import importDatabase from './db/importDatabase'
import initializeDatabase from './db/initializeDatabase'
import loadDatabase from './db/loadDatabase'
import resetDatabase from './db/resetDatabase'

// collections
import addFileToCollection from './models/collections/addFileToCollection'
import findLastUsedCollection from './models/collections/findLastUsedCollection'
import findLastUsedCollectionOrCreatNew from './models/collections/findLastUsedCollectionOrCreatNew'
import createCollection from './models/collections/createCollection'
import deleteCollection from './models/collections/deleteCollection'
import updateCollection from './models/collections/updateCollection'
import removeFileFromCollection from './models/collections/removeFileFromCollection'
import removeFileFromAllCollection from './models/collections/removeFileFromAllCollection'
import removeAllFilesFromCollection from './models/collections/removeAllFilesFromCollection'
import saveCollectionToFileSystem from './models/collections/saveCollectionToFileSystem'
import removeFileFromCollectionsSavedLocation from './models/collections/removeFileFromCollectionsSavedLocation'
import updatePermissionsForRootDirAndChildren from './models/collections/updatePermissionsForRootDirAndChildren'

// directories
import createDirectory from './models/directories/createDirectory'
import checkDirectoryForFilesInCollections from './models/directories/checkDirectoryForFilesInCollections'
import hideDirectoryAndFiles from './models/directories/hideDirectoryAndFiles'

// errors

// excludedDirectories
import addExcludedDirectoryName from './models/excludedDirectories/addExcludedDirectories'
import deleteExcludedDirectoryName from './models/excludedDirectories/deleteExcludedDirectoryName'
import getExcludedDirectoriesList from './models/excludedDirectories/getExcludedDirectoriesList'

// files
import createFile from './models/files/createFile'
import deleteFile from './models/files/deleteFile'
import deleteFiles from './models/files/deleteFiles'
import deleteRootFolderFiles from './models/files/deleteRootFolderFiles'
import saveFile from './models/files/saveFile'
import saveFiles from './models/files/saveFiles'
import updateFile from './models/files/updateFile'

// fileTypes
import addFileType from './models/fileTypes/addFileType'
import deleteFileType from './models/fileTypes/deleteFileType'
import changeFileTypeHidden from './models/fileTypes/changeFileTypeHidden'
import getFileTypeNames from './models/fileTypes/getFileTypeNames'
import hideFileType from './models/fileTypes/hideFileType'
import showFileType from './models/fileTypes/showFileType'
import toggleFileTypeHidden from './models/fileTypes/toggleFileTypeHidden'

// rootDirectories
import addRootDirectory from './models/rootDirectories/addRootDirectory'
import createRootDirectory from './models/rootDirectories/createRootDirectory'
import deleteRootDirectory from './models/rootDirectories/deleteRootDirectoryAndFiles'
import rescanRootDirectories from './models/rootDirectories/rescanRootDirectories'
import rootDirHasFilesInCollections from './models/rootDirectories/rootDirHasFilesInCollections'

// settings
import createSetting from './models/settings/createSetting'
import createInitialSetting from './models/settings/createInitialSetting'
import getCurrentSetting from './models/settings/getCurrentSetting'
import saveSetting from './models/settings/saveSetting'
import updateSetting from './models/settings/updateSetting'
import updateSettingLastScanned from './models/settings/updateSettingLastScanned'

// state
import { initialDbState } from './models/state/initialState'
import saveState from './models/state/saveState'
import getCurrentState from './models/state/getCurrentState'
import getCurrentStateWithOutId from './models/state/getCurrentStateWithOutId'
import setCurrentCollectionId from './models/state/setCurrentCollectionId'
import setCurrentDirectoryId from './models/state/setCurrentDirectoryId'
import setCurrentFileId from './models/state/setCurrentFileId'
import setCurrentRootDirectoryId from './models/state/setCurrentDirectoryId'
//types
import {
  fsaCollection,
  fsaCollectionFile,
  fsaDirectory,
  fsaError,
  fsaExcludedDirectory,
  fsaFile,
  fsaFileType,
  fsaSetting,
  fsaState
} from './models/types'

// utils - these are private

// fileSystem
import parseVirtualFileSystemEntry from './fileSystem/parseVirtualFileSystemEntry'

// reexports from library's
import { useLiveQuery } from 'dexie-react-hooks'

// all exports
export {
  //db
  db,
  initializeDatabase,
  exportDatabase,
  importDatabase,
  fetchDatabase,
  loadDatabase,
  resetDatabase,
  deleteDatabase,
  // collections
  addFileToCollection,
  createCollection,
  deleteCollection,
  updateCollection,
  removeFileFromCollection,
  removeFileFromAllCollection,
  removeAllFilesFromCollection,
  removeFileFromCollectionsSavedLocation,
  saveCollectionToFileSystem,
  findLastUsedCollection,
  findLastUsedCollectionOrCreatNew,
  updatePermissionsForRootDirAndChildren,
  // directories
  createDirectory,
  checkDirectoryForFilesInCollections,
  hideDirectoryAndFiles,
  // errors
  // excludedDirectories
  addExcludedDirectoryName,
  deleteExcludedDirectoryName,
  getExcludedDirectoriesList,
  // files
  createFile,
  deleteFile,
  deleteFiles,
  deleteRootFolderFiles,
  saveFile,
  saveFiles,
  updateFile,
  // fileTypes
  addFileType,
  deleteFileType,
  changeFileTypeHidden,
  getFileTypeNames,
  hideFileType,
  showFileType,
  toggleFileTypeHidden,
  // rootDirectories
  addRootDirectory,
  createRootDirectory,
  deleteRootDirectory,
  rescanRootDirectories,
  rootDirHasFilesInCollections,
  // settings
  createSetting,
  createInitialSetting,
  getCurrentSetting,
  updateSetting,
  updateSettingLastScanned,
  saveSetting,
  // state
  initialDbState,
  saveState,
  getCurrentState,
  setCurrentCollectionId,
  setCurrentDirectoryId,
  setCurrentFileId,
  setCurrentRootDirectoryId,
  getCurrentStateWithOutId,
  // utils

  // fileSystem
  parseVirtualFileSystemEntry,
  // reexports from library's
  useLiveQuery
}

export type {
  fsaCollection,
  fsaCollectionFile,
  fsaDirectory,
  fsaError,
  fsaExcludedDirectory,
  fsaFile,
  fsaFileType,
  fsaSetting,
  fsaState
}

