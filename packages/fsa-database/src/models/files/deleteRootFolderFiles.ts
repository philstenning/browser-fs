import { db } from '@db/setup'
import removeFileFromAllCollection from '@collections/removeFileFromAllCollection'

export default async function deleteRootFolderFiles(rootId: string) {
  try {
    const files = await db.files.where('rootId').equals(rootId).toArray()

    for (const file of files) {
      await removeFileFromAllCollection(file)
    }

    await db.files.where('rootId').equals(rootId).delete()
    return true
  } catch (e) {
    console.log(
      `Error deleting files with rootId of:${rootId} from database: ${e} `
    )
    return false
  }
}
