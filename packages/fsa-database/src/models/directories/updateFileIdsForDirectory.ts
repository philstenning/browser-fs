import { db } from '../../db/setup'
export default async function updateFileIdsForDirectory(directoryId: string, update = true) {
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
        })
      }
    }
  } catch (error) {
    console.error(
      `Error updating fileIds for directory :${directoryId}\n ${error}`
    )
  }
}
