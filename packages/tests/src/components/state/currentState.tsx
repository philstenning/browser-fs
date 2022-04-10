import React from 'react'
import {useFsaDbContext} from 'react-fsa-browser'
function CurrentState() {
    const {currentCollection,currentDirectory,currentRootDirectory,currentFile} = useFsaDbContext()
  return (
    <ul>
      <li>Collection: {currentCollection?.name}</li>
      <li>Directory: {currentDirectory?.name}</li>
      <li>RootDirectory: {currentRootDirectory?.name}</li>
      <li>File: {currentFile?.name}</li>
    </ul>
  );
}

export default CurrentState