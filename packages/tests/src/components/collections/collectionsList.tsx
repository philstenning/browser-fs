import React, { useState } from "react";
import { useCollections } from "react-fsa-browser";

function CollectionList() {
  const { collections } = useCollections();
  return (
    <div>
      <h3>Collections {collections.length}</h3>
      <Add/>
      <ul>
        {collections.map((col) => (
          <li key={col.id}>
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
  const handleClick=(e :React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.preventDefault()
      addCollection(collectionName)
  }

  return (
    <form>
      <input
        type="text"
        name="colName"
        id="colName"
        onChange={(e) => setCollectionName(e.target.value)}
        value={collectionName}
      />
      <button onClick={(e)=>handleClick(e)}>Add</button>
    </form>
  );
}
