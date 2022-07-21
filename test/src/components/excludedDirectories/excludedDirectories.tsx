import React, { useState } from 'react'
import { useExcludedDirectories } from '@philstenning/react-fsa-database'
export default function ExcludedFolders() {
  const [text, setText] = useState('')
  const {
    excludedDirectories,
    addExcludedDirectoryName,
    deleteExcludedDirectoryName
  } = useExcludedDirectories()

  const handleClick = () => {
    addExcludedDirectoryName(text)
    setText('')
  }

  return (
    <div>
      <h3>Excluded Folders</h3>
      <div>
        <label htmlFor="excludedFolders">
          <input
            type="text"
            name="excludedFolders"
            id="addExcludedFolderName"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button onClick={handleClick}>Add</button>
      </div>

      <ul>
        {excludedDirectories.map((ef) => (
          <li key={ef.id}>
            {ef.name}{' '}
            <button onClick={() => deleteExcludedDirectoryName(ef.id)}>
              delete
            </button>{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}
