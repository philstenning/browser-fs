import React from 'react'
import { useFsaDbContext } from "react-fsa-database";
function CurrentState() {
    const  {dbState} = useFsaDbContext()
    const {
      currentCollectionId,
      currentDirectoryId,
      currentRootDirectoryId,
      currentFileId,
    } = dbState;
  return (
    <ul>
      <li>Collection: {currentCollectionId}</li>
      <li>Directory: {currentDirectoryId}</li>
      <li>RootDirectory: {currentRootDirectoryId}</li>
      <li>File: {currentFileId}</li>
      <li>id: {dbState.id?.toString()?? 'null'}</li>
    </ul>
  );
}

export default CurrentState