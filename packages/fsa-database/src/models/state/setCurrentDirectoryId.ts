import getCurrentStateWithOutId from '@state/getCurrentStateWithOutId'
import saveState from '@state/saveState'

export default async function setCurrentDirectoryId(id = 'null') {
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentDirectoryId === id) return
  await saveState({ ...state, currentDirectoryId: id })
}
