import React, { useState } from "react";
import { useCollections, useFsaDbContext } from "react-fsa-browser";
import styles from "./collectionsList.module.css";
function CollectionList() {
  const { collections } = useCollections();
  const { dbState, setCurrentCollection } = useFsaDbContext();
  return (
    <div>
      <h3>Collections {collections.length}</h3>
      <Add />
      <ul>
        {collections.map((col) => (
          <li 
          className={col.id===dbState.currentCollection?styles.active:''}
          key={col.id}
          onClick={() => setCurrentCollection(col)}>
            {col.name} <span>files:{col.files.length}</span>
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
