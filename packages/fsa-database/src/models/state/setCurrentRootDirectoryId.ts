import getCurrentStateWithOutId from '@state/getCurrentStateWithOutId'
import saveState from '@state/saveState'

export default async function setCurrentRootDirectoryId(id = 'null') {
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentRootDirectoryId === id) return
  await saveState({ ...state, currentRootDirectoryId: id })
}
