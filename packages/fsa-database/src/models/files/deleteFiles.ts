
import { fsaFile } from '../types'
import { deleteFile } from './'
export default async function deleteFiles(files: fsaFile[]) {
  if (!files.length) return false
  try {
    for (const file of files) {
      await deleteFile(file)
    }
    return true
  } catch (e) {
    console.log(`Error deleting files in database: ${e} `, { files })
    return false
  }
}
