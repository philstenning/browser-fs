import { fsaCollection } from '../types'
import { db } from '@db/setup'
import findLastUsedCollection from '@collections/findLastUsedCollection'
import createCollection from '@collections/createCollection'
import setCurrentCollectionId from '@state/setCurrentDirectoryId'

export default async function findLastUsedCollectionOrCreatNew(
  nameIfNotExit: string = 'collection'
) {
  let collection: fsaCollection | undefined
  const count = await db.userCollections.count()

  // if there is only one return that one.
  if (count === 1) {
    collection = await db.userCollections.toCollection().last()

    // find the last used one.
  } else if (count > 1) {
    const col = await findLastUsedCollection()
    if (col) collection = col

    // no collections create a new one.
  } else {
    collection = await createCollection(nameIfNotExit)
  }
  // we should have a collection
  if (collection) {
    await setCurrentCollectionId(collection.id)
    return collection
  }
  // if we get here there should be a error from
  // a function we called.
  return null
}
