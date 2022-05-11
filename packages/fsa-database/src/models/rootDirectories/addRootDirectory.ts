import {
  selectRootDirectoryOnLocalDrive,
  scanLocalDrive,
  VirtualRootDirectoryType,
} from 'fsa-browser'
import {
  createRootDirectory,
  db,
  saveState,
  fsaDirectory,
  getFileTypeNames,
  setCurrentRootDirectoryId,
} from '../../'
import { getExcludedDirectoriesList } from '../excludedDirectories'
import parseVirtualFileSystemEntry from '../../fileSystem/parseVirtualFileSystemEntry'
/**
 * Creates a root directory in the database from a virtualRootDirectory object
 * @param {VirtualRootDirectoryType} virtualRootDirectory
 */
export default async function addRootDirectory(
  virtualRootDirectory: VirtualRootDirectoryType
) {
  if (!virtualRootDirectory) return

  const state = await db.state.toCollection().last()
  if (!state) return

  // save to db
  const dir = await createRootDirectory(virtualRootDirectory.handle)
  if (!dir || !dir.id) return

  // toggle on scanning
  await saveState({ ...state, isScanning: true })
  await setDirectoryIsScanning(true, dir)

  // extensions we want.
  const fileExtensions = await getFileTypeNames()
  // directories we don't want to scan.
  const excludedFolders = await getExcludedDirectoriesList()
  // scan drive for folders and files
  const data = await scanLocalDrive(
    virtualRootDirectory.handle,
    fileExtensions,
    100,
    excludedFolders
  )
  if (!data.id) return
  await parseVirtualFileSystemEntry(data, dir.id, dir.id).then(async () => {
    if (state) await saveState({ ...state, isScanning: false })
  })

  // now set the current rootDir in dbState
  await setCurrentRootDirectoryId(dir.id)
  // toggle off scanning
  await setDirectoryIsScanning(false, dir)
  await saveState({ ...state, isScanning: false })
}

// set rootDir as scanning
// this is for the ui component to let it know that
// this directory  is in the process of scanning.
async function setDirectoryIsScanning(isScanning: boolean, dir: fsaDirectory) {
  if (isScanning) {
    dir.isScanning = true
    dir.scanFinished = false
  } else {
    dir.isScanning = false
    dir.scanFinished = true
  }

  try {
    await db.directories.put(dir)
  } catch (error) {
    console.error(`Error updating directory ${error}`)
  }

  return dir
}
