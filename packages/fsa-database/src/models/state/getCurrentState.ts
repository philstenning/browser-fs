import { db } from '../../db/setup'
import { initialDbState } from './initialState'

/**
 * @category State
 */
export default async function getCurrentState() {
  try {
    let state = await db.state.toCollection().last()
    if (!state) state = initialDbState
    return state
  } catch (error) {
    console.error(`error getting state ${error}`)
    return initialDbState
  }
}
