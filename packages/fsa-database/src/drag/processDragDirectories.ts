import { createVirtualRootDirectory } from 'fsa-browser'
import { setIsScanning, addRootDirectory } from '../'
import { scanDirectoryLegacy } from './saveDragItems'
export default async function processDragDirectories(
  directories: DataTransferItem[]
) {
    if (!directories.length) return false

  // add directories as rootDirectories
  // using FileSystemDirectoryHandles
  if ( 'showDirectoryPicker' in window) {
    // console.log('dirs', directories.length)
    for (const dir of directories) {
      const handle = await dir.getAsFileSystemHandle()
      const vRoot = createVirtualRootDirectory(
        handle as FileSystemDirectoryHandle,
        '',
        true
      )
      await addRootDirectory(vRoot)
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
    await setIsScanning()
    Promise.all(dirs)
    // console.log('All done 🚀')
  }
}
