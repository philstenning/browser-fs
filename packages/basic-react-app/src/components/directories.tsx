import { fsaDirectory } from 'fsa-database'
import { useDirectories, useFsaDbContext } from 'react-fsa-database'

import styles from './directories.module.css'

function Directories() {
  const { directoriesForRootDirectory, setCurrentDirectoryId } =
    useDirectories()
  const { dbState } = useFsaDbContext()
  const { currentDirectoryId } = dbState
 
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Directories</h2>
      <ul className={styles.list} >
        {directoriesForRootDirectory?.map((dir) => (
          <ListItem
            
            key={dir.id}
            dir={dir}
            selected={currentDirectoryId === dir.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default Directories

type Props = {
  dir: fsaDirectory
  selected: boolean
}
const ListItem = ({ dir, selected }: Props) => {
  const { setCurrentDirectoryId } = useDirectories()
  if (dir.fileCount === 0) return <></>
  return (
    <li
      onClick={() => setCurrentDirectoryId(dir.id)}
      className={`${selected?'selected':''} ${styles.listItem}`}
    >
      {dir.name} - {dir.fileCount}
    </li>
  )
}
