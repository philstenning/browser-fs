import dragAddFilesToDirectory from '../drag/dragAddFilesToDirectory'
import processDragDirectories from './processDragDirectories'
// import setIsScanning from '@state/setIsScanning'
// import { fsaDirectory } from '../models/types'
// import { db } from '@db/setup'
// import createDragDirectory from '@drag/createDragDirectory'
// import readFileSystemDirectoryEntry from './readFileSystemDirectoryEntry'

// let doneCounter = 0

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
    await Promise.all([
      dragAddFilesToDirectory(files, folderName),
      processDragDirectories(directories),
    ])
  } else {
    await processDragDirectories(directories)
  }

  // add the directories to the database
  // console.log('⛷️App returned')
}

// process all the dirs recursively
// const processDirectoriesRecursively = (
//   directories: FileSystemDirectoryEntry[],
//   rootId: string,
//   depth: number,
//   maxDepth: number
// ) => {
//   return new Promise<boolean>((resolve) => {
//     const promisees = []
//     for (const dir of directories) {
//       const dirToScan = scanDirectoryLegacy(
//         dir as FileSystemDirectoryEntry,
//         maxDepth,
//         rootId,
//         depth
//       )
//       promisees.push(dirToScan)
//     }
//     Promise.all(promisees)
//     doneCounter++
//     resolve(true)
//   })
// }

