import React from 'react'
import {
  useRootDirectories,
  useFsaDbContext,
} from '@philstenning/react-fsa-database'
import styles from './directories.module.css'

function RootDirectories() {
  const { addRootDirectory, rootDirectories } = useRootDirectories()
  const { dbState, setCurrentRootDirectoryId } = useFsaDbContext()
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Root Directories</h2>
      <button className={styles.btn} onClick={addRootDirectory}>
        Add Root Directory
      </button>
      <ul className={styles.list}>
        {rootDirectories.map((dir) => (
          <li
            key={dir.id}
            onClick={() => setCurrentRootDirectoryId(dir.id)}
            className={`${styles.listItem} ${
              dbState.currentRootDirectoryId === dir.id ? 'selected' : ''
            }`}
          >
            {dir.name}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RootDirectories

