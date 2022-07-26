import { db } from '../db/setup'
import { fsaDirectory } from '../models/types'
import createLegacyDirectory from './createLegacyDirectory'
import createLegacyFile from './createLegacyFile'
import createLegacyFileList from './createLegacyFileList'
import setCurrentRootDirectoryId from '../models/state/setCurrentRootDirectoryId'
import updateFileIdsForDirectory from '../models/directories/updateFileIdsForDirectory'
import isScanning from '../models/state/setIsScanning'
type TempDir = {
  name: string
  path: string
  splitPath: string[]
  parentPath: string
  depth: number
}

type DirectoryEntry = {
  name: string
  path: string
  depth: number
  dir: fsaDirectory
}
/**
 * when a user clicks a input type=file element, the files are processed and
 * a compleat directory tree is created from the list in the database.
 * Note the file/blob is copied to the database so you will end up with large
 * database table for the files so use the FSA api instead this is for browsers
 * that do not support FSA access.
 * @category Legacy (non FSA support)
 * @param fileList
 * @returns {Promise<void>}  Promise that return void when resolved. 
 * */
export default async function saveLegacyInputFiles(fileList: FileList | null) {
  if (!fileList || fileList.length === 0) return
  await isScanning(true)
  // any file will have the same root dir name but go with the  first.
  const rootDirName = fileList[0].webkitRelativePath.split('/')[0]

  // create the root dir.
  const rootDir = await createLegacyDirectory(rootDirName, rootDirName)
  if (!rootDir) {
    await isScanning(false)
    return
  }

  const { DirectoryList, legacyFileList, maxDirectoryDepth } =
    createLegacyFileList(fileList, rootDir.id)

  const tempDirs: TempDir[] = []

  // from the DirectoryList we can now create a list
  // of tempDir objects to work with.
  // we have a unique list already
  for (const dir of DirectoryList) {
    const split = dir.split('/')
    const parentPath =
      split.length > 1 ? split.slice(0, split.length - 1).join('/') : '/'
    tempDirs.push({
      name: split.at(-1) ?? 'noName__error', // name of directory
      depth: split.length,
      path: dir,
      parentPath,
      splitPath: split,
    })
  }

  const directoryEntry: DirectoryEntry[] = []

  // Add the rood Directory
  directoryEntry.push({
    depth: 0,
    dir: rootDir,
    name: rootDirName,
    path: rootDirName,
  })

  // iterate over all directories by depth in dir tree
  for (let index = 2; index <= maxDirectoryDepth; index++) {
    // we only want to work with dirs at current depth
    const result = tempDirs.filter((f) => f.depth === index)

    for (const { parentPath, name, path, depth } of result) {
      // if there is no parent then it is the root dir.
      const parentDirId =
        directoryEntry.filter((d) => d.path === parentPath)[0]?.dir.id ??
        rootDir.id
      const newDir = await createLegacyDirectory(
        name,
        path,
        rootDir.id,
        parentDirId,
        index
      )
      if (!!newDir) {
        directoryEntry.push({ name, path, depth, dir: newDir })
      }
    }
  }

  // ADD files to db
  for (const { path, file } of legacyFileList) {
    const parent = directoryEntry.find((i) => i.path === path)
    await createLegacyFile(
      parent?.dir.id ?? 'error',
      rootDir.id,
      file,
      path,
      true
    )
  }

  // count files for each directory and update them.
  for (const dirItem of directoryEntry) {
    if (dirItem.dir.isRoot) {
      // we don't want to update the scanning notifications. 
      await updateFileIdsForDirectory(dirItem.dir.id,true,false)
    } else {
      await updateFileIdsForDirectory(dirItem.dir.id)
    }
  }
  await setCurrentRootDirectoryId(rootDir.id)
  await db.directories.put({
    ...rootDir,
    isScanning: false,
    scanFinished: true,
    readPermission: 'false',
  })
  await isScanning(false)
}
