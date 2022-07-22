
import { fsaFile } from '../types'
import deleteFile  from './deleteFile'

/**
 * Remove all the files in the params array from the database, and also
 * removes them from any collections they are in.
 * @param {fsaFile[]}files 
 * @returns 
 */
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
