import { db } from '../../db/setup'
/**
 * Returns an array of the names of the directories that are excluded
 *  from the scanning process
 * @returns {Promise<string[]>} A Promise that contains  array of the excluded directory names.
 */
export default async function getExcludedDirectoriesList(): Promise<string[]> {
  return (await db.excludedDirectories.toArray()).map((item) => item.name)
}
