
import {db} from '../../db/setup'
import getCurrentState from '../state/getCurrentState'

async function getCurrentCollection() {
  const state = await getCurrentState()
  if (!state?.currentCollectionId) return false

  try {
    const collection = await db.userCollections.get(state?.currentCollectionId)
    if (collection) return collection
  } catch (error) {
    console.error(`Error getting current Collection ${error}`)
  }
  return false
}

export default getCurrentCollection