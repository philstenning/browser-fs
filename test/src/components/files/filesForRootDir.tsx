import React from 'react'
import {
  useRootFileList,
  useCollectionFiles,
  useFsaDbContext
} from '@philstenning/react-fsa-database'
import { fsaFile, checkHandlePermission } from '@philstenning/fsa-database'
//@ts-ignore
import styles from './filesForRootDir.module.css'

// import { dir } from "console";

function FilesForRootDir() {
  const { dbState, setCurrentFileId } = useFsaDbContext()
  const list = useRootFileList(true, true)
  const { addFileToCollection } = useCollectionFiles()

  const handleClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    file: fsaFile
  ) => {
    e.stopPropagation()
    await addFileToCollection(file)
    setCurrentFileId(file.id)
  }

  const checkPerm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: fsaFile
  ) => {
    e.stopPropagation()
    checkHandlePermission(file)
  }

  const listStyles = (file: fsaFile) => {
    return `${dbState.currentFileId === file.id ? 'active' : ''} ${
      file.hidden === 'true' ? 'hidden' : ''
    }`
  }

  return (
    <div className={styles.container} data-testid="filesForRootDir">
      <h3>Files for Current Root ({list.length})</h3>
      <ul data-cy="filesForRootDirList">
        {list &&
          list.map((file, index) => (
            <li className={listStyles(file)} key={file.id}>
              <span
                onClick={(e) => handleClick(e, file)}
                data-testid={`filesForRootDirListItem-${index}`}
              >
                {file.name} {file.hidden}
              </span>
              <button onClick={(e) => checkPerm(e, file)}>check</button>{' '}
              {file.size}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default FilesForRootDir
