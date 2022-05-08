/* eslint-disable no-await-in-loop */
import { fsaDirectory, db } from 'fsa-database'

export async function unMergeDirectories(rootDir: fsaDirectory) {
  await db.transaction('rw', db.directories, db.files, async () => {
    const files = await db.files.where('rootId').equals(rootDir.id).toArray()

    try {
      // get all files for root dir
      for (const file of files) {
        // get old dir remove fileID
        const old = await db.directories
          .where(':id')
          .equals(file.parentId)
          .first()

        if (!old) {
          throw new Error(
            `current directory not found with id of: ${file.parentId} `
          )
        }

        old.fileIds = old.fileIds.filter((id) => id !== file.id)
        old.fileCount = old.fileIds.length

        const initial = await db.directories
          .where(':id')
          .equals(file.InitialParentId)
          .first()
        // get initial dir add fileId
        if (!initial) {
          throw new Error(
            `initial directory not found with id of: ${file.InitialParentId} `
          )
        }
        initial.fileIds = [...initial.fileIds, file.id]
        initial.fileCount = initial.fileIds.length

        await db.directories.bulkPut([old, initial])

        // change parent id to initial
        file.parentId = file.InitialParentId

        await db.files.put(file)
      }
    } catch (error) {
      console.error(`error unMerging ${rootDir.name}:  ${error}`)
    }
  })
}
