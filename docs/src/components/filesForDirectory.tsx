import { useCurrentDirectory } from '@philstenning/react-fsa-database'
import Card from './card'

import styles from './filesForDirectory.module.css'

function FilesForDirectory() {
  const { directoryFiles, currentDirectory } = useCurrentDirectory()

  return (
    <main>
      <ul className={styles.cardGrid}>
        {currentDirectory?.readPermission === 'true' &&
          directoryFiles.map((f) => <Card key={f.id} file={f} />)}
      </ul>
    </main>
  )
}

export default FilesForDirectory
