import { db } from '../../db/setup'
import { fsaCollection } from '../types'
import removeAllFilesFromCollection from './removeAllFilesFromCollection'

/**
 * Remove the id from the files.userCollections prop
 * then remove collection from database.
 * @param collection
 * @returns
 */
export default async function deleteCollection(collection: fsaCollection) {
  if (!collection.id) return false
  await removeAllFilesFromCollection(collection.id)
  await db.userCollections.delete(collection.id)
  return false
}
