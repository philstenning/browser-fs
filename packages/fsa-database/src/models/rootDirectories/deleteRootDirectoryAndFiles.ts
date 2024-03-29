import { fsaDirectory } from '../types'
import rootDirHasFilesInCollections from './rootDirHasFilesInCollections'
import deleteRootFolderFiles from '../files/deleteRootFolderFiles'
import { db } from '../../db/setup'

import selectPreviouslySelectedRootDir from './selectPreviouslySelectedRootDir'

/**
 * @category Root Directories
 * @returns
 */
export default async function deleteRootDirectory(dir: fsaDirectory) {
  if (!dir.id) return false

  const hasCollections = await rootDirHasFilesInCollections(dir.id)
  if (hasCollections) {
    console.warn("TODO: have collections don't delete")
  }

  try {
    const hasDeletedFiles = await deleteRootFolderFiles(dir.id)
    if (hasDeletedFiles) {
      await db.directories.where('rootId').equals(dir.id).delete()
      await selectPreviouslySelectedRootDir()
      return true
    }
  } catch (error) {
    console.log(
      `Error deleting root folder :${dir.name} from database: ${error} `
    )
    return false
  }
  return false
}
