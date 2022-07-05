import getCurrentStateWithOutId from '@state/getCurrentStateWithOutId'
import saveState from '@state/saveState'

export default async function setCurrentFileId(id = 'null') {
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentFileId === id) return
  await saveState({ ...state, currentFileId: id })
}
