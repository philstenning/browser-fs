import React, { useState } from "react";
import { useCollections, useFsaDbContext } from "react-fsa-database";
import { fsaCollection } from "fsa-database";
//@ts-ignore
import styles from "./collectionsList.module.css";
function CollectionList() {
  const {
    collections,
    removeAllFilesFromCollection,
    removeCollection,
    cloneCollection,
    saveCollectionToFileSystem,
  } = useCollections();

  const { dbState, setCurrentCollectionId } = useFsaDbContext();

  const clearCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    collection: fsaCollection
  ) => {
    e.stopPropagation();

    removeAllFilesFromCollection(collection.id);
    setCurrentCollectionId(collection.id);
  };

  const deleteCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    collection: fsaCollection
  ) => {
    e.stopPropagation();
    removeCollection(collection);
  };
  const copyCollection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    collection: fsaCollection
  ) => {
    e.stopPropagation();
    cloneCollection(collection);
  };

  return (
    <div data-testid="collectionList">
      <h3> Collections ({collections.length})</h3>
      <Add />
      <ul className={styles.list}>
        {collections.map((col, index) => (
          <li
            className={
              col.id === dbState.currentCollectionId ? styles.active : ""
            }
            key={col.id}
            onClick={() => setCurrentCollectionId(col.id)}
            data-testid={`collectionListItem-${index}`}
          >
            <div className={styles.btnGroup}>
              <span> {col.name}</span>
              <span>files:{col.files.length}</span>
              <button
                onClick={(e) => clearCollection(e, col)}
                data-testid={`collectionListItem-${index}_btnClear`}
              >
                Clear
              </button>
              <button
                onClick={(e) => deleteCollection(e, col)}
                data-testid={`collectionListItem-${index}_btnDelete`}
              >
                Delete
              </button>
              <button
                onClick={(e) => copyCollection(e, col)}
                data-testid={`collectionListItem-${index}_btnCopy`}
              >
                Copy
              </button>
              <button
                onClick={(e) => saveCollectionToFileSystem(col.id)}
                data-testid={`collectionListItem-${index}_btnSave`}
              >
                save
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionList;

function Add() {
  const { addCollection } = useCollections();
  const [collectionName, setCollectionName] = useState("");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addCollection(collectionName);
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.add}
        type="search"
        name="colName"
        id="colName"
        onChange={(e) => setCollectionName(e.target.value)}
        value={collectionName}
        autoComplete="off"
      />
      <button
        onClick={(e) => handleClick(e)}
        data-testid={`collectionList_btnAdd`}
      >
        Add
      </button>
    </form>
  );
}
