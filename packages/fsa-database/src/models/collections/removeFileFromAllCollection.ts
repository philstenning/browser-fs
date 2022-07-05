import { fsaFile } from '../types'
import { db } from '@db/setup'
import removeFileFromCollection from './removeFileFromCollection'

export default async function removeFileFromAllCollection(file: fsaFile) {
  for (const colId of file.userCollectionIds) {
    const collection = await db.userCollections.get(colId)
    if (collection) {
      await removeFileFromCollection(collection, file)
    }
  }
}
