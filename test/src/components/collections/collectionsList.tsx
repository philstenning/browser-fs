import React, { useState } from 'react'
import {
  useCollections,
  useFsaDbContext
} from '@philstenning/react-fsa-database'
import { fsaCollection } from '@philstenning/fsa-database'
//@ts-ignore
import styles from './collectionsList.module.css'
function CollectionList() {
  const {
    collections,
    removeAllFilesFromCollection,
    removeCollection,
    cloneCollection,
    saveCollectionToFileSystem
  } = useCollections()

  const { dbState, setCurrentCollectionId } = useFsaDbContext()

  const clearCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    collection: fsaCollection
  ) => {
    e.stopPropagation()

    removeAllFilesFromCollection(collection.id)
    setCurrentCollectionId(collection.id)
  }

  return (
    <div>
      <h3> Collections ({collections.length})</h3>
      <Add />
      <ul className={styles.list} data-cy="collectionList">
        {collections.map((col, index) => (
          <li
            className={
              col.id === dbState.currentCollectionId ? styles.active : ''
            }
            key={col.id}
          >
            <div className={styles.btnGroup}>
              <span
                data-cy={`selectCollection-${index}`}
                onClick={() => setCurrentCollectionId(col.id)}
                className={styles.nameGroup}
              >
                <span>{col.name}</span>
                <span>files:{col.files.length}</span>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  clearCollection(e, col)
                }}
                data-cy={`clearCollection-${index}`}
              >
                Clear
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeCollection(col)
                }}
                data-cy={`deleteCollection-${index}`}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  cloneCollection(col)
                }}
                data-cy={`copyCollection-${index}`}
              >
                Copy
              </button>
              <button
                onClick={(e) => saveCollectionToFileSystem(col.id)}
                data-cy={`saveCollection-${index}`}
              >
                save
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollectionList

function Add() {
  const { addCollection } = useCollections()
  const [collectionName, setCollectionName] = useState('')

  return (
    <form className={styles.form}>
      <input
        className={styles.add}
        type="search"
        name="addCollectionInput"
        id="addCollectionInput"
        onChange={(e) => setCollectionName(e.target.value)}
        value={collectionName}
        autoComplete="off"
      />
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          addCollection(collectionName)
        }}
        data-cy={`addCollectionButton`}
      >
        Add
      </button>
    </form>
  )
}
