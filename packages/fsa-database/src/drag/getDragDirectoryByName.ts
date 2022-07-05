import { fsaDirectory } from '../models/types'
import { db } from '../db/setup'
/**
 * Looks for the root directory of the name param, if it can't be
 * found it creates it with that name.
 * @param {string} name
 * @returns {Promise<fsaDirectory | false>} When resolved, returns a fsaDirectory or false if it errors.
 */
async function getDragDirectoryByName(
  name: string = 'testDrag'
): Promise<fsaDirectory | false> {
  try {
    // try and find the default directory it exists
    const dir = await db.directories.where({ isRoot: 'true', name }).first()
    if (dir) {
      return dir
    }
  } catch (error) {
    console.log(`Error getting Directory for drag and drop ${error}`)
  }
  return false
}

export default getDragDirectoryByName
