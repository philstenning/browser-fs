import React from 'react'
import { useFsaDbContext } from '@philstenning/react-fsa-database'
function CurrentState() {
  const { dbState } = useFsaDbContext()
  const {
    currentCollectionId,
    currentDirectoryId,
    currentRootDirectoryId,
    currentFileId,
    isScanning
  } = dbState
  return (
    <ul data-testid="currentDbState">
      <li data-testid="currentDbState_collection">
        Collection: {currentCollectionId}
      </li>
      <li data-testid="currentDbState_directory">
        Directory: {currentDirectoryId}
      </li>
      <li data-testid="currentDbState_rootDir">
        RootDirectory: {currentRootDirectoryId}
      </li>
      <li data-testid="currentDbState_rootDir">
        isScanning: {isScanning ? 'true' : 'false'}
      </li>
      <li data-testid="currentDbState_file">File: {currentFileId}</li>
      <li data-testid="currentDbState_id">
        id: {dbState.id?.toString() ?? 'null'}
      </li>
    </ul>
  )
}

export default CurrentState
