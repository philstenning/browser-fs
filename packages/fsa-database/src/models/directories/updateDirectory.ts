import { fsaDirectory } from '../types'
import { db } from '../../db/setup'

/**
 * @category Directories
 */
export default async function updateDirectory(directory: fsaDirectory) {
  if (directory.name.length < 2 && directory.handle.name !== directory.name) {
    console.error(`error updating directory  name too short`)
    return false
  }

  try {
    const dirId = await db.directories.put(directory)
    if (dirId === directory.id) return true
  } catch (e) {
    console.error(`error updating directory ${directory.name} ${e}`)
  }
  return false
}
