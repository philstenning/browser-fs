import { db } from '../../db'

/**
 * Show or hide a fileType, updates the hidden prop of the fileType
 * @category Files Types
 */
export default async function toggleFileTypeHidden(id: number) {
  if (!id || typeof id !== 'number') return
  try {
    const ft = await db.fileTypes.get(id)
    if (ft) {
      await db.fileTypes.put({ ...ft, hidden: !ft.hidden })
    }
  } catch (error) {
    console.error(`Error updating fileType hidden property ${error}`)
  }
}
