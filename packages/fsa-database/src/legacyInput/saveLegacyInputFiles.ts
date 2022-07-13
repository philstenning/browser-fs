import { db } from '../db/setup'
import { fsaDirectory } from 'models/types'
import createLegacyDirectory from './createLegacyDirectory'
import createLegacyFile from './createLegacyFile'
import createLegacyFileListItem, {
  LegacyFileList,
} from './createLegacyFileListItem'
import setCurrentRootDirectoryId from '../models/state/setCurrentRootDirectoryId'
import updateFileIdsForDirectory from '../models/directories/updateFileIdsForDirectory'

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

export default async function saveLegacyInputFiles(fileList: FileList | null) {
  if (!fileList || fileList.length === 0) return
  const legacyFileList: LegacyFileList = []

  // any file will have the same root dir name but go with the  first.
  const rootDirName = fileList[0].webkitRelativePath.split('/')[0]

  // create the root dir.
  const rootDir = await createLegacyDirectory(rootDirName, rootDirName)
  if (!rootDir) return

  // create list of dirs
  // use Set to make them unique.
  const DirectoryList = new Set<string>()

  // store the most deeply nested directory depth
  let maxDirectoryDepth = 0

  // add all fileList items to the legacyFileList
  for (const file of fileList) {
    const legacyFileListItem = createLegacyFileListItem(file, rootDir.id)
    legacyFileList.push(legacyFileListItem)
    const { depth, directories } = legacyFileListItem

    if (depth > maxDirectoryDepth) maxDirectoryDepth = depth

    // add all the legacyFileListItem directories, even if they don't
    // have files in them this is needed for directory tree.
    directories.forEach((d) => DirectoryList.add(d))
  }

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

  // count files for dir
  for (const dirItem of directoryEntry) {
    // console.log('\n\n-------------\nid of item: ', dirItem.dir.id)
    await updateFileIdsForDirectory(dirItem.dir.id)
  }
  await setCurrentRootDirectoryId(rootDir.id)
  await db.directories.put({
    ...rootDir,
    isScanning: false,
    scanFinished: true,
  })
}
