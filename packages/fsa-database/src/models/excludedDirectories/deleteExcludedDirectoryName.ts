import { db } from '../../db/setup'

/**
 * @example
 * ```ts
 * const result = await deleteExcludedDirectoryName(3)
 * ```
 * Returns true if the excluded name has been removed from the database
 * @category Excluded Directories
 * @returns {Promise<boolean>} A Promise of true or false when fulfilled
 */
export default async function deleteExcludedDirectoryName(
  id: number | undefined
): Promise<boolean> {
  if (!id) return false
  try {
    await db.excludedDirectories.delete(id)
    return true
  } catch (error) {
    console.error(`Error deleting excluded folderName with id:${id} ${error}`)
  }
  return false
}
