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
  getFileExtension
} from 'fsa-database'

export default async function saveDragItems(
  dataTransferItemList: DataTransferItemList,
  folderName: string = 'user Files'
) {
  const files: File[] = []
  const directories: DataTransferItem[] = []

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
  console.clear()
  if (!!files.length) {
    await dragAddFilesToDirectory(files, folderName)
  }

  await processDragDirectories(directories)
}

async function processDragDirectories(directories: DataTransferItem[]) {
  // add directories as rootDirectories
  // using FileSystemDirectoryHandles
  if (false && directories.length && 'showDirectoryPicker' in window) {
    console.log('dirs', directories.length)

    for (const dir of directories) {
      //@ts-ignore.
      dir.getAsFileSystemHandle().then((handle) => {
        const vRoot = createVirtualRootDirectory(handle, '', true)
        console.log(vRoot)
        addRootDirectory(vRoot)
      })
    }
  } else if (directories.length) {
    // console.log(
    //   '%cYour browser does not have showDirectoryPicker implemented yet!!! 😢',
    //   'color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold'
    // )
    //TODO add using files.
    // console.clear()
    const dirs = []
    for (const dir of directories) {
      const fsEntry = dir.webkitGetAsEntry() as FileSystemDirectoryEntry
      console.log(` #### start ${fsEntry.name}`)
      dirs.push(scanDirectoryLegacy(fsEntry, 100))
    }
    Promise.all(dirs)
  }
  console.log('All done 🚀')
}

type p = {
  files: fsaFile[]
  // directories: FileSystemDirectoryEntry[]
}
async function scanDirectoryLegacy(
  directory: FileSystemDirectoryEntry,
  maxDepth = 2,
  rootId: string = '',
  depth: number = 0
) {
  // we don't want to necessarily scan all the way to the bottom.
  // so we have a max scan dept
  if (depth++ === maxDepth) return false

  // console.log(`${depth} - Directory name: ${directory.name}`)

  // create this directory
  const { fullPath, name } = directory
  const currentDir = await createDragDirectory(
    name,
    fullPath,
    rootId === '' ? true : false,
    rootId,
    false
  )
  if (!currentDir) return false
  // first time called these should be empty.
  const currentRootId = !!rootId.length ? rootId : currentDir.id
  // const currentParentId= !!parentId.length?parentId:currentDir.id

  //
  const filetypeNames = await getFileTypeNames()

  const getFile = (fileSystemEntry: FileSystemFileEntry) =>
    new Promise<File>((resolve, reject) => {
      fileSystemEntry.file(
        (f) => {
          resolve(f)
        },
        (e) => reject(e)
      )
    })

  const foo = new Promise<p>((resolve, reject) => {
    const reader = directory.createReader()

    const files: fsaFile[] = []
    // const directories: FileSystemDirectoryEntry[] = []

    reader.readEntries(async (entry) => {
      for (const item of entry) {
        if (item.isFile) {
          // check for the file extensions that we want
          if (!filetypeNames?.includes(getFileExtension(item.name))) {
            continue
          }
          const file = await getFile(item as FileSystemFileEntry)
          const createdFile = await createDragFile(
            currentDir.id,
            currentRootId,
            file
          )
          if (createdFile) files.push(createdFile)
        }
        if (item.isDirectory) {
          await scanDirectoryLegacy(
            item as FileSystemDirectoryEntry,
            maxDepth,
            currentRootId,
            depth
          )
        }
      }
      resolve({ files })
    })
  })

  const { files } = await foo
  const updatedCurrentDir: fsaDirectory = {
    ...currentDir,
    fileCount: files.length,
    fileIds: [...files.map((f) => f.id)]
  }

  await db.transaction('rw', db.directories, db.files, async () => {
    await db.directories.put(updatedCurrentDir)
    await db.files.bulkPut(files)
  })

  // files.forEach((f) => console.log(` ${depth}  name: ${f.name}`))

  // console.log(files.length, directories[0].name)

  // const dirs = []
  // for (const dir of directories) {
  //   await saveDirectoryLegacy(dir, rootId, currentDir.id, depth, maxDepth)
  //   // dirs.push(saveDirectoryLegacy(dir, rootId, currentDir.id, depth, maxDepth))
  // }
  // Promise.all(dirs)

  // console.log(`  ### ${depth} ${currentDir.name} done`)
  return true
}
// const reader = directory.createReader()
// console.log('first')
// const readDir = () => {
//   return new Promise((resolve, reject) => {
//     const files: FileSystemFileEntry[] = []
//     const directories: FileSystemDirectoryEntry[] = []
//     reader.readEntries((dir) => {
//       for (const item of dir) {
//         if (item.isDirectory) {
//           directories.push(item as FileSystemDirectoryEntry)
//         }
//         // files
//         if (item.isFile) {
//           files.push(item as FileSystemFileEntry)
//         }
//       }
//     })
//     resolve({files,directories})
//   })
// }
// const data =await readDir()

// console.log({data})

// files.forEach((f) => console.log(`  ${depth}  ${f.name}`))
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/*   #### create fsaFiles. #######  */
// const fsaFiles: fsaFile[] = []
// const fileIds: string[] = []
// for (const item of files) {
//   item.file((f) => {
//     createDragFile(currentDir.id, rootId, f, false).then((res) => {
//       if (res) {
//         const { fileCount, fileIds,id } = currentDir
//         db.directories.put({
//           ...currentDir,
//           fileIds: [...fileIds, res.id],
//           fileCount: fileCount + 1
//         })
//         db.files.add({...res,parentId:id})
//       }
//     })
//   })
//   console.log(fileIds.length)
// }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// for (const dir of directories) {
//   await saveDirectoryLegacy(
//     dir as FileSystemDirectoryEntry,
//     rootId,
//     currentDir.id,
//     depth,
//     maxDepth
//   )
// }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//   console.log(
//     `  ${depth} finished reading entries.. depth: ${depth} ${directories.length}`
//   )
// }

// reader.readEntries(async (dir) => {
//   for (const item of dir) {
//     if (item.isDirectory) {
//       // recursion.
//       await saveDirectoryLegacy(
//         item as FileSystemDirectoryEntry,
//         rootId,
//         currentDir.id,
//         depth,
//         maxDepth
//       )
//     }

//     // files
//     if (item.isFile) {
//       // stop ts moaning
//       const file = item as FileSystemFileEntry

//       file.file(async (f) => {
//         const fsaFile = await createDragFile(parentId, rootId, f, false)
//         if (fsaFile) {
//           files.push(fsaFile)
//           fileIds.push(fsaFile.id)
//           console.log(`\t${depth} - ${directory.name} file: ${fsaFile.name} `)
//         }
//       })
//     }
//   }
//   files.forEach((f) => console.log(f))
// }
