import React from 'react'
import { fsaFile } from "fsa-database";
import { useCollections, useFsaDbContext } from "react-fsa-database";
//@ts-ignore
// import styles from "./currentCollectionItems.module.css";
function CollectionItems() {
  const { currentCollectionItems, removeFileFromCollection } = useCollections();
  const { dbState, setCurrentFileId } = useFsaDbContext();

  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    file: fsaFile
  ) => {
    e.stopPropagation();
    removeFileFromCollection(file);
  };

  const setCurrentItem = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setCurrentFileId(id);
  };

  return (
    <div data-testid="currentCollectionItems">
      <h4>Collection Items</h4>
      {/* currentCollectionItems */}
      <ul data-cy="currentCollection">
        {currentCollectionItems.map((item, index) => (
          <li
            key={item.id}
            className={`${dbState.currentFileId === item.id ? "active" : ""} ${
              item.hidden === "true" ? "hidden" : ""
            }`}
          >
            <span
              onClick={(e) => setCurrentItem(e, item.id)}
              data-cy={`collectionItem-${index}`}
            >
              {item.order} {item.name}
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
  );
}

export default CollectionItems;
