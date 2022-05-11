import { db, createFile, fsaFile } from '../'
import { getFileExtension, bytesToSize } from '../utils'

async function createDragFile(
  parentId: string,
  rootId: string,
  file: File,
  save = false
) {
  const tempFile = await createFile(
    {} as FileSystemFileHandle,
    parentId,
    rootId,
    'local',
    getFileExtension(file.name),
    file.name,
    '',
    false,
    []
  )
  const updatedFile: fsaFile = {
    ...tempFile,
    blob: file,
    size: bytesToSize(file.size),
  }
  if (save) {
    try {
      const res = await db.files.add(updatedFile)
      // add id to list for directoryIds
      if (res) {
        return updatedFile
      }
    } catch (error) {
      console.error(`oh no it failed....${typeof file}`)
    }
  } else {
    return updatedFile
  }
  return false
}

export default createDragFile
