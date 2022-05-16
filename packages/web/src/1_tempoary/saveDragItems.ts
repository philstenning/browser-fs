import {
  dragAddFilesToDirectory,
  addRootDirectory,
  createDragFile,
  fsaFile,
  db,
  fsaDirectory
} from 'fsa-database'
import { createVirtualRootDirectory } from 'fsa-browser'
import {
  createDragDirectory,
  getFileTypeNames,
  getFileExtension,
  setIsScanning
} from 'fsa-database'

const filetypeNames = await getFileTypeNames()
let doneCounter = 0
let fileCounter = 0

//
export default async function saveDragItems(
  dataTransferItemList: DataTransferItemList,
  folderName: string = 'user Files'
) {
  console.time('startScan')
 
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
  console.log('first')
}

async function processDragDirectories(directories: DataTransferItem[]) {
  // add directories as rootDirectories
  // using FileSystemDirectoryHandles
 

  if (!directories.length) return false
  if (false && 'showDirectoryPicker' in window) {
    console.log('dirs', directories.length)

    for (const dir of directories) {
      //@ts-ignore.
      dir.getAsFileSystemHandle().then((handle) => {
        const vRoot = createVirtualRootDirectory(handle, '', true)
        addRootDirectory(vRoot)
      })
    }
  } else {
    // we might have more than one dir and it may take some time
    // so do it async with a promise.all
    const dirs = []
    for (const dir of directories) {
      const fsEntry = dir.webkitGetAsEntry() as FileSystemDirectoryEntry
      console.log(` #### start ${fsEntry.name}`)
      dirs.push(scanDirectoryLegacy(fsEntry, 100))
    }
   const state = await setIsScanning()
 console.log({ state })
    Promise.all(dirs)
    console.log('All done 🚀')
  }
}

const getFile = (fileSystemEntry: FileSystemFileEntry) =>
  new Promise<File>((resolve, reject) => {
    fileSystemEntry.file(
      (f) => {
        resolve(f)
      },
      (e) => reject(e)
    )
  })

type readFileSystemDirectoryEntryProp = {
  files: fsaFile[]
  directories: FileSystemDirectoryEntry[]
}

/**
 * Reads the directory  passed in  and returns an object containing
 * the containing files and directories.
 * @param {FileSystemDirectoryEntry} directory
 * @param {string} parentId
 * @param {string} rootId
 * @param {number} depth
 * @param {number} maxDepth
 * @returns {fsaFile[]} A promise that when resolved returns an array of fsaFiles
 */
const readFileSystemDirectoryEntry = (
  directory: FileSystemDirectoryEntry,
  parentId: string,
  rootId: string
  // depth: number,
  // maxDepth: number
) => {
  return new Promise<readFileSystemDirectoryEntryProp>((resolve, reject) => {
    const reader = directory.createReader()

    const files: fsaFile[] = []
    const directories: FileSystemDirectoryEntry[] = []

    reader.readEntries(async (entry) => {
      for (const item of entry) {
        if (item.isFile) {
          // check for the file extensions that we want
          if (
            !filetypeNames?.includes(
              getFileExtension(item.name).toLocaleLowerCase()
            )
          ) {
            continue
          }
          const file = await getFile(item as FileSystemFileEntry)
          const createdFile = await createDragFile(parentId, rootId, file)
          if (createdFile) files.push(createdFile)
        }
        if (item.isDirectory) {
          directories.push(item as FileSystemDirectoryEntry)
        }
      }
      resolve({ files, directories })
    })
  })
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
    // console.log(`dir added ${++doneCounter} `)
    resolve(true)
  })
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

async function scanDirectoryLegacy(
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

  // console.log(`file.count ${files.length}`)
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
    isScanning: false
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
    console.timeEnd('startScan')
    console.log(`files processed ${fileCounter}`)
    await setIsScanning(false)
  }
  return true
}
