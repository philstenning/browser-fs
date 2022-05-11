import {
  dragAddFilesToDirectory,
  addRootDirectory,
  createDragFile,
  fsaFile
} from 'fsa-database'
import { createVirtualRootDirectory } from 'fsa-browser'
import { createDragDirectory } from 'fsa-database'

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
  if (!!files.length) {
    dragAddFilesToDirectory(files, folderName)
  }

  processDragDirectories(directories)
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
    console.clear()
    for (const dir of directories) {
      const fsEntry = dir.webkitGetAsEntry() as FileSystemDirectoryEntry
      const rootDir = await createDragDirectory(
        dir.getAsFile()?.name,
        '/',
        true,
        true
      )
      if (rootDir) {
        const { id } = rootDir
        await saveDirectoryLegacy(fsEntry, id, id)
      }
    }
  }
}
async function saveDirectoryLegacy(
  directory: FileSystemDirectoryEntry,
  rootId: string,
  parentId: string,
  depth: number = 0,
  maxDepth = 2
) {
  // we don't want to necessarily scan all the way to the bottom.
  // so we have a max scan dept
  if (depth++ === maxDepth) return

  console.log(`${depth} - Directory name: ${directory.name}`)

  // create this directory
  const { fullPath, name } = directory
  const currentDir = await createDragDirectory(name, fullPath, false, false)
  if (!currentDir) return

  const files: fsaFile[] = []
  const fileIds: string[] = []

  const reader = directory.createReader()
  reader.readEntries(async (dir) => {
    for (const item of dir) {
      if (item.isDirectory) {
        // recursion.
        await saveDirectoryLegacy(
          item as FileSystemDirectoryEntry,
          rootId,
          currentDir.id,
          depth,
          maxDepth
        )
      }

      // files
      if (item.isFile) {
        // stop ts moaning
        const file = item as FileSystemFileEntry
        
        file.file(async (f) => {
          const fsaFile = await createDragFile(parentId, rootId, f, false)
          if (fsaFile) {
            files.push(fsaFile)
            fileIds.push(fsaFile.id)
            console.log(`\t${depth} - ${directory.name} file: ${fsaFile.name} `)
          }
        })
      }
    }
    files.forEach((f) => console.log(f))
  })

  console.log('finished reading entries...')
}
