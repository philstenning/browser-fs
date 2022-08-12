import React, {useState, useEffect} from 'react'
import {
  useCollections,
  useFsaDbContext,
  fsaFile
} from '@philstenning/react-fsa-database'

import styles from './card.module.css'

const Card: React.FunctionComponent<{ file: fsaFile }> = ({ file }) => {
  const [url, setUrl] = useState('')
  const {
    addFileToCollection,
    fileIsInCurrentCollection,
    removeFileFromCollection
  } = useCollections()
  const {
    dbState: { currentFileId },
    setCurrentFileId
  } = useFsaDbContext()

  const getFileUrl = async () => {
    try {
      const f = await file.handle.getFile()
      if (f) {
        setUrl(URL.createObjectURL(f))
      }
    } catch (error) {
      console.error('No permission for file')
    }
  }

  // must be called to free up memory when finished with.
  const clearUrl = () => {
    if (url) URL.revokeObjectURL(url)
    setUrl('')
//     console.log('url cleared')
  }

  useEffect(() => {
    getFileUrl()
    return clearUrl()
  }, [file.id])
  
  return (
    <li
      key={file.id}
      className={`${styles.card} ${currentFileId === file.id ? 'current-file' : ''}`}
      onClick={() => setCurrentFileId(file.id)}
    >
      <img className={styles.image} src={url} alt="goo" />
      {/* <h3>Card</h3> */}
      {/* {!fileIsInCurrentCollection(file.id) && (
        <button onClick={() => addFileToCollection(file)}>
          Add to Collection
        </button>
      )}
      {fileIsInCurrentCollection(file.id) && (
        <button onClick={() => removeFileFromCollection(file)}>
          Remove from Collection
        </button>
      )} */}
    </li>
  )
}


export default Card