import React, { useState } from "react";
import { useCollections, useFsaDbContext } from "react-fsa-database";
import { useLiveQuery, db } from "fsa-database";
import { fsaCollection } from "fsa-database";
//@ts-ignore
import styles from "./collectionsList.module.css";
function CollectionList() {
  const {
    collections,
    removeAllFilesFromCollection,
    removeCollection,
    cloneCollection,
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
    <div>
      <h3>Collections ({collections.length})</h3>
      <Add />
      <ul className={styles.list}>
        {collections.map((col) => (
          <li
            className={
              col.id === dbState.currentCollectionId ? styles.active : ""
            }
            key={col.id}
            onClick={() => setCurrentCollectionId(col.id)}
          >
            <div className={styles.btnGroup}>
              {" "}
              {col.name} <span>files:{col.files.length}</span>
              <button onClick={(e) => clearCollection(e, col)}>Clear</button>
              <button onClick={(e) => deleteCollection(e, col)}>Delete</button>
              <button onClick={(e) => copyCollection(e, col)}>Copy</button>
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
    <form>
      <input
        type="text"
        name="colName"
        id="colName"
        onChange={(e) => setCollectionName(e.target.value)}
        value={collectionName}
      />
      <button onClick={(e) => handleClick(e)}>Add</button>
    </form>
  );
}
