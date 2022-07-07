import { initialDbState } from './initialState'
import getCurrentState from './getCurrentState'

export default async function getCurrentStateWithOutId() {
  try {
    const state = await getCurrentState()
    delete state?.id
    return state
  } catch (error) {
    console.error(`error getting state ${error}`)
  }
  return initialDbState
}
