/* eslint-disable consistent-return */
import { useLiveQuery } from 'dexie-react-hooks'
import {
  db,
  fsaCollection,
  createCollection,
  deleteCollection,
  updateCollection,
  fsaCollectionFile,
  saveCollectionToFileSystem,
} from '@philstenning/fsa-database'
import useFsaDbContext from '../context/useFsaDbContext'

/**
 *
 * A Hook for using collections
 *
 * @example
 * ```tsx
 * function MyCollectionsComponent(){
 *   const {  collections, addCollection, removeCollection} = useCollections()
 *   return(
 *     <div></div>
 *   )
 * }
 * ```
 *
 *
 *
 * @category Hooks
 *
 */
const useCollections = () => {
  const collections =
    useLiveQuery(() =>
      db.userCollections.orderBy('created').reverse().toArray()
    ) ?? []

  const { setCurrentCollectionId } = useFsaDbContext()

  async function addCollection(
    name: string,
    files: fsaCollectionFile[] = [],
    description = '',
    creator: string = '',
    tags: string[] = []
  ) {
    const res = await createCollection(name, files, description, creator, tags)
    if (res) {
      setCurrentCollectionId(res.id)
      return true
    }
    return false
  }

  const removeCollection = async (collection: fsaCollection) => {
    const res = await deleteCollection(collection)
    if (!res) return
    // if we only have one left set it as current.
    const count = await db.userCollections.count()
    if (count === 1) {
      const col = await db.userCollections.toCollection().first()
      if (col) setCurrentCollectionId(col.id)
      // If there is none left
    } else if (count === 0) {
      setCurrentCollectionId('')
    }
  }
  
  const cloneCollection = async (
    collection: fsaCollection,
    name: string = 'copy'
  ) => {
    let newName = name
    if (name === 'copy') newName = `${collection.name}_copy`
    const { files, description, creator, tags } = collection
    const clone =
      (await createCollection(newName, files, description, creator, tags)) ??
      null
    if (!clone) return false
    setCurrentCollectionId(clone.id)
    return clone
  }

  return {
    collections,
    addCollection,
    removeCollection,

    updateCollection,
    cloneCollection,
    saveCollectionToFileSystem,
  }
}

export default useCollections

