import { db } from '../../db/setup'
import { fsaFile } from '../types'
import { removeFileFromAllCollection } from '../collections'

/**
 * Removes a single file from the database and any collection it is in.
 * @param {fsaFile} file
 * @category Files
 * @returns
 */
export default async function deleteFile(file: fsaFile) {
  try {
    const res = await removeFileFromAllCollection(file)

    // remove file from parent dir
    const parent = await db.directories.get(file.parentId)
    if (parent) {
      const fileIds = parent?.fileIds.filter((f) => f !== file.id)
      db.directories.put({ ...parent, fileIds, fileCount: fileIds.length })
      await db.files.delete(file.id)
    }

    // console.log("TODO remove from User collections");
    return true
  } catch (e) {
    console.log(`Error deleting file: ${file.name} from database: ${e} `)
    return false
  }
}
