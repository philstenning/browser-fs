import { db } from '../../db/setup'

/**
 * This is called after all files have been added to the database
 * so you can update the scanFinished prop at the same time.
 * @param directoryId 
 * @param update 
 * @param scanFinished 
 */
export default async function updateFileIdsForDirectory(
  directoryId: string,
  update = true,
  scanFinished = true
) {
  try {
    const fileIds = (
      await db.files.where({ parentId: directoryId }).toArray()
    ).map((r) => r.id)
    if (update) {
      const dir = await db.directories.get(directoryId)
      if (dir) {
        await db.directories.put({
          ...dir,
          fileCount: fileIds.length,
          fileIds,
          isScanning: !scanFinished,
          scanFinished,
        })
      }
    }
  } catch (error) {
    console.error(
      `Error updating fileIds for directory :${directoryId}\n ${error}`
    )
  }
}
