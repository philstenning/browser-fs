import { saveState, getCurrentStateWithOutId } from './'

export default async function setCurrentRootDirectoryId(id = 'null') {
  console.log('tried to set state setCurrentRootDirectoryId')
  if (id.length < 3) id = 'null'
  const state = await getCurrentStateWithOutId()
  if (state.currentRootDirectoryId === id) return
  await saveState({ ...state, currentRootDirectoryId: id })
}
