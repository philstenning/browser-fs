import getCurrentStateWithOutId from './getCurrentStateWithOutId'
import saveState from './saveState'

/**
 * @category State
 */
export default async function setCurrentDirectoryId(id = 'null') {
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentDirectoryId === id) return
  await saveState({ ...state, currentDirectoryId: id })
}
