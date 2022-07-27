import { db } from '../../db/setup'
/**
 * Returns an array of the names of the directories that are excluded
 *  from the scanning process
 * @category Excluded Directories
 */
export default async function getExcludedDirectoriesList(): Promise<string[]> {
  return (await db.excludedDirectories.toArray()).map((item) => item.name)
}
