import { fsaDirectory } from '../types'
import checkDirectoryForFilesInCollections from './checkDirectoryForFilesInCollections'
import { db } from '../../db/setup'
export default async function hideDirectoryAndFiles(
  directory: fsaDirectory,
  hide: 'true' | 'false' = 'true',
  checkForFilesInCollections = true
) {
  // if files are in collections they will still be set to hidden
  // so we check first if they are in a collection
  if (
    checkForFilesInCollections &&
    (await checkDirectoryForFilesInCollections(directory)).hasCollections
  ) {
    return false
  }
  await db.transaction('rw', db.directories, db.files, async () => {
    try {
      const files = await db.files.bulkGet(directory.fileIds)
      for (const file of files) {
        if (!file) return
        file.hidden = hide
        await db.files.put(file)
      }

      directory.hidden = hide
      await db.directories.put(directory)
    } catch (e) {
      console.error(
        `error hiding directory and it's files. ${directory.name} ${e}`
      )
      return false
    }
  })
  return true
}
