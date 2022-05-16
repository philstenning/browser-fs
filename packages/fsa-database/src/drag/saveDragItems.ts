import { db, fsaDirectory, setIsScanning } from '../../'
import {
  processDragDirectories,
  dragAddFilesToDirectory,
  createDragDirectory,
  readFileSystemDirectoryEntry
} from './'

let doneCounter = 0

//
export default async function saveDragItems(
  dataTransferItemList: DataTransferItemList,
  folderName: string = 'user Files'
) {
  // console.time('startScan')

  const files: File[] = []
  const directories: DataTransferItem[] = []

  // sort the files from directories
  for (const item of dataTransferItemList) {
    // files
    if (item.webkitGetAsEntry()?.isFile) {
      const file = item.getAsFile()
      if (file) files.push(file)
    }
    // directories
    if (item.webkitGetAsEntry()?.isDirectory) {
      directories.push(item)
    }
  }
  // add the files to the database
  if (!!files.length) {
    await dragAddFilesToDirectory(files, folderName)
  }
  // add the directories to the database
  await processDragDirectories(directories)
  // console.log('⛷️App returned')
}


// process all the dirs recursively
const processDirectoriesRecursively = (
  directories: FileSystemDirectoryEntry[],
  rootId: string,
  depth: number,
  maxDepth: number
) => {
  return new Promise<boolean>((resolve) => {
    const promisees = []
    for (const dir of directories) {
      const dirToScan = scanDirectoryLegacy(
        dir as FileSystemDirectoryEntry,
        maxDepth,
        rootId,
        depth
      )
      promisees.push(dirToScan)
    }
    Promise.all(promisees)
    doneCounter++
    resolve(true)
  })
}


export async function scanDirectoryLegacy(
  directory: FileSystemDirectoryEntry,
  maxDepth = 2,
  rootId: string = '',
  depth: number = 0
) {
  // we don't want to necessarily scan all the way to the bottom.
  // so we have a max scan dept
  if (depth++ === maxDepth) return false

  // create this directory
  const { fullPath, name } = directory
  const currentDir = await createDragDirectory(
    name,
    fullPath,
    rootId === '' ? true : false,
    rootId,
    true
  )
  if (!currentDir) return false // if something went wrong.

  // first time this is called, it should be empty.
  const currentRootId = !!rootId.length ? rootId : currentDir.id

  // get all the files and directories contained within this directory
  const { files, directories } = await readFileSystemDirectoryEntry(
    directory,
    currentDir.id,
    currentRootId
  )

  // process all  the directories
  await processDirectoriesRecursively(
    directories,
    currentRootId,
    depth,
    maxDepth
  )

  // we now have the data to update this directory
  const updatedCurrentDir: fsaDirectory = {
    ...currentDir,
    fileCount: files.length,
    fileIds: [...files.map((f) => f.id)],
    isScanning: false,
  }
  // we don't want dangling files so use a transaction.
  await db.transaction('rw', db.directories, db.files, async () => {
    try {
      await db.directories.put(updatedCurrentDir)
      await db.files.bulkPut(files)
    } catch (error) {
      console.error(` error adding files to directory.  ${error}`)
    }
  })
  doneCounter--
  // console.log(`finish counter ${}`)
  if (doneCounter === 0) {
    // console.timeEnd('startScan')
    // console.log(`files processed ${fileCounter}`)
    await setIsScanning(false)
  }
  return true
}
