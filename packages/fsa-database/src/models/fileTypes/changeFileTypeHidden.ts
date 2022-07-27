import { db } from '../../db'
/**
 * @category Files Types
 */
export default async function changeFileTypeHidden(
  id: number,
  hidden: boolean = false
) {
  if (!id || typeof id !== 'number') return
  try {
    const ft = await db.fileTypes.get(id)
    if (ft) {
      await db.fileTypes.put({ ...ft, hidden })
    }
  } catch (error) {
    console.error(`Error updating fileType hidden property ${error}`)
  }
}
