import { fsaDirectory } from '../models/types'
import { db } from '../db/setup'
/**
 * Gets the root directory by id.
 * @param { string} [dirId] The id of the root directory you want to return.
 * @returns {Promise<fsaDirectory| false>} When resolved, returns a fsaDirectory or false if it errors.
 */
async function getDragDirectoryById(
  dirId?: string
): Promise<fsaDirectory | false> {
  if (!dirId) {
    return false
  }
  try {
    const dir = await db.directories.get(dirId)
    if (dir) {
      return dir
    } else {
      return false
    }
  } catch (error) {
    console.error(`Error finding root directory ${dirId}`)
  }
  return false
}

export default getDragDirectoryById
