import { fsaDirectory } from '../types'
import { db } from '@db/setup'

/**
 * Returns true if a root directory with the same name exists already
 * @param {string} name
 * @returns {Promise<boolean>} When resolved, returns true if no Root directories have the same name
 */
export default async function rootDirectoryAlreadyExists(
  name: string
): Promise<boolean> {
  const dirs = await db.directories.where({ isRoot: 'true', name }).count()
  if (dirs === 0) return false
  return true
}
