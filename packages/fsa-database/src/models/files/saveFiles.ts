import { db } from '../../db/setup'
import { fsaFile } from '../types'
/**
 * Saves or updates the files if they already exists in the database,
 * the original files are overwritten.
 * @param {fsaFile[]} files
 * @category Files
 * @returns {}
 */
export default async function saveFiles(files: fsaFile[]) {
  try {
    const result = await db.files.bulkAdd(files, { allKeys: true })
    if (result.length === files.length) return true
  } catch (e) {
    console.log(`Error Saving files: in database: ${e} `)
  }
}
