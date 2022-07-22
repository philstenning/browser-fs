import React from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  db,
  fsaFile,
  fsaCollection,
  getCurrentCollection,
  addFileToCollection as fsaAddFileToCollection,
  removeFileFromCollection as fsaRemoveFileFromCollection,
  removeAllFilesFromCollection,
} from '@philstenning/fsa-database'
import useFsaDbContext from '../context/useFsaDbContext'

/**
 * get the items/files of the currently selected collection
 * @returns
 */
function getItems() {
  const list = useLiveQuery(async () => {
    // get state
    const state = await db.state.toCollection().last()
    if (!state?.currentCollectionId) return
    // get current collection
    const collection = await db.userCollections.get(state?.currentCollectionId)
    if (collection) {
      // get the files
      const files =
        (await db.files
          .where('id')
          .anyOf(collection.files.map((f) => f.fileId))
          .toArray()) ?? []

      // add order from the collection.
      const orderedFiles: fsaFile[] = []
      files.forEach((f) => {
        const match = collection.files.filter((c) => c.fileId === f.id)[0]
        orderedFiles.push({
          ...f,
          order: match.order ?? 0,
          name: match.name,
        })
      })
      // sort asc order
      // eslint-disable-next-line consistent-return
      return orderedFiles.sort((a, b) => a.order - b.order)
    }
    return []
  })
  return list ?? []
}


/**
 * 
 * Hook for adding/removing files to your Collections
 * 
 * @category  Hooks - collections
 */
function useCollectionFiles() {
  const { setCurrentCollectionId, dbState } = useFsaDbContext()
  const collectionFiles = getItems()

  const addFileToCollection = async (
    file: fsaFile,
    collection?: fsaCollection
  ) => {
    const added = await fsaAddFileToCollection(file, collection)
    if (!added) {
      // console.log('file not added to collection...')
      return
    }
    // console.log('file added to collection...')
    // set the passed collection to the current collection if it isn't already.
    if (collection && dbState.currentCollectionId !== collection.id)
      setCurrentCollectionId(collection.id)
  }

  const removeFileFromCollection = async (
    file: fsaFile,
    collection?: fsaCollection
  ) => {
    // if we don't have a collection
    // we assume we want to remove it from
    // the current selected collection
    if (!collection) {
      const col = await getCurrentCollection()
      if (col) {
        await fsaRemoveFileFromCollection(col, file)
      }
      return
    }
    await fsaRemoveFileFromCollection(collection, file)
  }

  return {
    addFileToCollection,
    removeFileFromCollection,
    removeAllFilesFromCollection,
    collectionFiles,
  }
}

export default useCollectionFiles


