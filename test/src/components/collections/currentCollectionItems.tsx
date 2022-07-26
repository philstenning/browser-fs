import React from 'react'
import { fsaFile } from '@philstenning/fsa-database'
import {
  useFsaDbContext,
  useCollectionFiles
} from '@philstenning/react-fsa-database'

function CollectionItems() {
  const { collectionFiles, removeFileFromCollection } = useCollectionFiles()
  const { dbState, setCurrentFileId } = useFsaDbContext()

  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    file: fsaFile
  ) => {
    e.stopPropagation()
    removeFileFromCollection(file)
  }

  const setCurrentItem = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation()
    setCurrentFileId(id)
  }

  return (
    <div data-testid="currentCollectionItems">
      <h4>Collection Items</h4>
      {/* currentCollectionItems */}
      <ul data-cy="currentCollection">
        {collectionFiles.map((item, index) => (
          <li
            key={item.id}
            className={`${dbState.currentFileId === item.id ? 'active' : ''} ${
              item.hidden === 'true' ? 'hidden' : ''
            }`}
          >
            <span
              onClick={(e) => setCurrentItem(e, item.id)}
              data-cy={`collectionItem-${index}`}
            >
              {item.order} {item.uniqueName}
            </span>
            <button
              onClick={(e) => removeItem(e, item)}
              data-testid={`collectionItem-${index}-btnRemove`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollectionItems
