import { db } from '../../db/setup'

/**
 * Returns true if the excluded name has been removed from the database
 * @param {number} id 
 * @returns {Promise<boolean>} A Promise of true or false when fulfilled
 */
export default async function deleteExcludedDirectoryName(id: number | undefined): Promise<boolean> {
  if(!id) return false
  try {
  await db.excludedDirectories.delete(id)
  return true
  } catch (error) {
    console.error(`Error deleting excluded folderName with id:${id} ${error}`);
  }
  return false
}
