import {
  useCurrentDirectory,
  useCollections,
  useFsaDbContext,
  fsaFile
} from '@philstenning/react-fsa-database'
import { useEffect, useState } from 'react'

function FilesForDirectory() {
  const { directoryFiles } = useCurrentDirectory()
  const { addFileToCollection } = useCollections()
  // const {
  //   dbState: { currentFileId },
  //   setCurrentFileId
  // } = useFsaDbContext()

  // const handleClick = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   file: fsaFile
  // ) => {
  //   e.stopPropagation()
  //   addFileToCollection(file)
  // }
  return (
    <main>
      <ul className="card-grid">
        {directoryFiles.map((f) => (
          <Card file={f} />
        ))}
      </ul>
    </main>
  )
}

const Card: React.FunctionComponent<{ file: fsaFile }> = ({ file }) => {
  const [url, setUrl] = useState('')
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

  const clearUrl = () => {
    if (url) URL.revokeObjectURL(url)
    setUrl('')
    console.log('url cleared')
  }

  useEffect(() => {
    getFileUrl()
    return clearUrl()
  }, [file])
  return (
    <li
      key={file.id}
      className={`card ${currentFileId === file.id ? 'current-file' : ''}`}
      onClick={() => setCurrentFileId(file.id)}
    >
      <img src={url} alt="goo" />
      <h3>Card</h3>
    </li>
  )
}

export default FilesForDirectory

/* <li
              key={f.id}
              className={`card ${currentFileId === f.id ? 'current-file' : ''}`}
              onClick={() => setCurrentFileId(f.id)}
            >
              {/* {f.blob && <img src={URL.createObjectURL(f.blob)} alt="no" />} */

/* <div>{f.handle.name}</div> */

/* <ul>
                <li> {f.name}</li>
                <li>{f.size}</li>
                {/* <li>{f.blob && URL.createObjectURL(f.handle.getFile())}</li> */

// ;<li>{f.id?.split('-')[0]}</li>
// </ul> */}

// <button onClick={(e) => handleClick(e, f)}>
//   Add to Collection
// </button>
// </li> */}
