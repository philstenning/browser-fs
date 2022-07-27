import getCurrentStateWithOutId from './getCurrentStateWithOutId'
import saveState from './saveState'

/**
 * @category State
 */
export default async function setCurrentCollectionId(id = 'null') {
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentCollectionId === id) return
  await saveState({ ...state, currentCollectionId: id })
}
