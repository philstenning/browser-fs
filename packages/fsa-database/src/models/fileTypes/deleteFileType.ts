import { db } from '../../db'
import { fsaFileType } from '../types'

/**
 * Removes a fileType from the database with the
 * option of also removing the files of that type also.
 *
 * @param {fsaFileType} fileType
 * @param {Promise<boolean>} [andAllFilesWithExtension=false]
 * @returns A Promise of boolean - true if completed successfully
 */
export default  async function deleteFileType(
  fileType: fsaFileType,
  andAllFilesWithExtension: boolean = false
) {
  if (!fileType.id) return false
  if (andAllFilesWithExtension) {
    try {
      await db.transaction('rw', db.fileTypes, db.files, async () => {
        if (!fileType.id) return false
         await db.fileTypes.delete(fileType.id)
        await db.files.where('type').equals(fileType.name).delete()
      })
      return true
    } catch (error) {
      console.error(` error deleting file type and files ${error}`)
    }
  }
  try {
    await db.fileTypes.delete(fileType.id)
    return true
  } catch (error) {
    console.error(` error deleting file type ${error}`)
  }
  return false
}