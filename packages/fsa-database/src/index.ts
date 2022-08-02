/*  --------- Types  ---------  */
import {
  fsaCollection,
  fsaCollectionFile,
  fsaDirectory,
  fsaError,
  fsaExcludedDirectory,
  fsaFile,
  fsaFileType,
  fsaSetting,
  fsaState,
} from './models/types'
import type {
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
} from '@philstenning/fsa-browser'
import type { fsaBrowserStorage } from './utils/browserStorage'
/*  --------- database  ---------  */
import { db, FsaDb } from './db/setup'
import deleteDatabase from './db/deleteDatabase'
import exportDatabase from './db/exportDatabase'
import fetchDatabase from './db/fetchDatabase' // use for testing
import importDatabase from './db/importDatabase'
import initializeDatabase from './db/initializeDatabase'
import loadDatabase from './db/loadDatabase'
import resetDatabase from './db/resetDatabase'

/*  --------- models  ---------  */

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
import mergeToParentDirectory from './models/directories/mergeToParentDir'
import unMergeDirectories from './models/directories/unMergeDirectories'
import updateDirectory from './models/directories/updateDirectory'

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

// legacyInput
import saveLegacyInputFiles from './legacyInput/saveLegacyInputFiles'

// rootDirectories
import addRootDirectory from './models/rootDirectories/addRootDirectory'
import createRootDirectory from './models/rootDirectories/createRootDirectory'
import deleteRootDirectory from './models/rootDirectories/deleteRootDirectoryAndFiles'
import rescanRootDirectories from './models/rootDirectories/rescanRootDirectories'
import rootDirHasFilesInCollections from './models/rootDirectories/rootDirHasFilesInCollections'
import selectRootDirectory from './models/rootDirectories/selectRootDirectory'
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
import setCurrentRootDirectoryId from './models/state/setCurrentRootDirectoryId'
import setIsScanning from './models/state/setIsScanning'

/*  --------- other  ---------  */

// utils
import bytesToSize from './utils/bytesToSize'
import getFileExtension from './utils/getFileExtension'
import getFileNameWithoutExtension from './utils/getFileNameWithoutExtension'
import checkBrowserStorage from './utils/browserStorage'
// drag
import saveDragItems from './drag/saveDragItems'

// fileSystem
import checkHandlePermission from './fileSystem/checkHandlePermission'
import parseVirtualFileSystemEntry from './fileSystem/parseVirtualFileSystemEntry'

export type {
  fsaCollection,
  fsaCollectionFile,
  fsaDirectory,
  fsaError,
  fsaExcludedDirectory,
  fsaFile,
  fsaFileType,
  fsaSetting,
  fsaState,
  fsaBrowserStorage,
  // reexport
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
}
// all exports
export {
  /* -- database -- */
  db,
  initializeDatabase,
  exportDatabase,
  importDatabase,
  fetchDatabase,
  FsaDb,
  loadDatabase,
  resetDatabase,
  deleteDatabase,
  /* -- models  -- */
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
  mergeToParentDirectory,
  unMergeDirectories,
  updateDirectory,
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
  // legacyInput
  saveLegacyInputFiles,
  // rootDirectories
  addRootDirectory,
  createRootDirectory,
  deleteRootDirectory,
  rescanRootDirectories,
  rootDirHasFilesInCollections,
  selectRootDirectory,
  // settings
  createSetting,
  createInitialSetting,
  getCurrentSetting,
  updateSetting,
  updateSettingLastScanned,
  saveSetting,
  setIsScanning,
  // state
  initialDbState,
  saveState,
  getCurrentState,
  setCurrentCollectionId,
  setCurrentDirectoryId,
  setCurrentFileId,
  setCurrentRootDirectoryId,
  getCurrentStateWithOutId,
  /* -- Other -- */
  // utils
  bytesToSize,
  getFileExtension,
  getFileNameWithoutExtension,
  checkBrowserStorage,
  //drag
  saveDragItems,
  // fileSystem
  checkHandlePermission,
  parseVirtualFileSystemEntry,
}
