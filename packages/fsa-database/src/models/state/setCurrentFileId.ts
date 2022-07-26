import getCurrentStateWithOutId from './getCurrentStateWithOutId'
import saveState from './saveState'

/**
 * @category State
 */
export default async function setCurrentFileId(id = 'null') {
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentFileId === id) return
  await saveState({ ...state, currentFileId: id })
}
