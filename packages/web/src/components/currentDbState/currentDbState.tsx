import React from 'react'
import { useFsaDbContext } from "react-fsa-database";
function CurrentState() {
    const  {dbState} = useFsaDbContext()
    const {
      currentCollection,
      currentDirectory,
      currentRootDirectory,
      currentFile,
    } = dbState
  return (
    <ul>
      <li>Collection: {currentCollection}</li>
      <li>Directory: {currentDirectory}</li>
      <li>RootDirectory: {currentRootDirectory}</li>
      <li>File: {currentFile}</li>
      <li>id: {dbState.id?.toString()?? 'none'}</li>
    </ul>
  );
}

export default CurrentState