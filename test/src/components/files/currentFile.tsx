import React from 'react'
import { useCurrentFile } from '@philstenning/react-fsa-database'

export default function currentFile() {
  const file = useCurrentFile()

  if (!file) return <div>null</div>
  return (
    <div>
      <h4>Current Selected File</h4>
      <ul test-cy="selectedFile">
        <li>{file.name}</li>
        <li>uniqueName: {file.uniqueName}</li>
        <li>hidden: {file.hidden}</li>
        <li>
          collections{' '}
          <span data-cy="filesCollections">
            {file.userCollectionIds.length}
          </span>{' '}
        </li>
        <li>{file.size}</li>
      </ul>
    </div>
  )
}
