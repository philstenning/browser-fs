import { useDirectoryFiles, useFsaDbContext , useCollections} from 'react-fsa-database'
import styles from './directoryFiles.module.css'

function DirectoryFiles() {
    const {addFileToCollection} = useCollections()
  const { directoryFiles } = useDirectoryFiles()
  const { setCurrentFileId, dbState } = useFsaDbContext()
  return (
    <div className={styles.container}>
      {/* <h2 className={styles.header}>Directory files</h2> */}
      <ul className={styles.list}>
        {directoryFiles.map((file) => (
          <li
          key={file.id}
            onClick={() => setCurrentFileId(file.id)}
            className={`${styles.listItem} ${
              dbState.currentFileId === file.id ? 'selected' : ''
            } `}
          >
            <span> {file.name}</span>
            <button onClick={() => addFileToCollection(file)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DirectoryFiles
