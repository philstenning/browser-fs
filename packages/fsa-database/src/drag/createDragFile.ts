import { db, createFile } from '../'
import { getFileExtension, bytesToSize } from '../utils'

async function createDragFile(id: string, file: File) {
  const tempFile = await createFile(
    {} as FileSystemFileHandle,
    id,
    id,
    'local',
    getFileExtension(file.name),
    file.name,
    '',
    false,
    []
  )
  try {
    const res = await db.files.add({
      ...tempFile,
      blob: file,
      size: bytesToSize(file.size),
    })
    // add id to list for directoryIds
    if (res) {
      return res
    }
  } catch (error) {
    console.error(`oh no it failed....${typeof file}`)
  }
  return false
}

export default createDragFile