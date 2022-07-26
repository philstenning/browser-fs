import { fsaExcludedDirectory } from '../types'
import { db } from '../../db/setup'
/**
 * @category Excluded Directories
 */
export default async function addExcludedDirectoryName(name: string) {
  name = name.trim()
  try {
    const hasName = await db.excludedDirectories.where({ name }).count()
    if (!!hasName) return // already in db

    const id = await db.excludedDirectories.add({ name })

    const excludedFolder: fsaExcludedDirectory = { name, id }
    return excludedFolder
  } catch (error) {
    console.error(`Error adding excludedFolder name:${name} ${error}`)
  }
}
