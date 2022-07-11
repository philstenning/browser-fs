import React from 'react'
import { useRootDirectories, useFsaDbContext } from 'react-fsa-database'
import { fsaDirectory, rescanRootDirectories, saveLegacyInputFiles } from 'fsa-database'

// icons
import { ImSpinner6 } from 'react-icons/im'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import {  BiTrash } from 'react-icons/bi'
//@ts-ignore
import styles from './rootDirectories.module.css'

const RootDirectories = () => {
  const { rootDirectories, addRootDirectory, deleteRootDirectory } =
    useRootDirectories()

  const { dbState, setCurrentRootDirectoryId, isScanning } = useFsaDbContext()
  
  const saveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // console.log(e.target.files)
    if(e.target.files){
      // saveDragItems(e.target.files)
     saveLegacyInputFiles(e.target.files)
    }
  }

  return (
    <div data-testid="rootDirectories">
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir, index) => (
            <li
              className={
                dbState.currentRootDirectoryId === dir.id
                  ? `${styles.active} ${styles.listItem}`
                  : `${styles.listItem}`
              }
              key={dir.id}
              onClick={() => setCurrentRootDirectoryId(dir.id)}
            >
              <button
                className={styles.btnTrash}
                onClick={() => deleteRootDirectory(dir)}
                data-cy={`deleteRootDir_${dir.name}`}
              >
                <BiTrash />
              </button>
              <span data-cy={`selectRootDir_${dir.name}`}>{dir.name} </span>
              <ScanningContent dir={dir} scanning={isScanning} index={index} />
            </li>
          ))}
      </ul>
      <div className={styles.btnGroup}>
        {!('showDirectoryPicker' in window) && (
          <input
            type="file"
            id="filelist"
            webkitdirectory=""
            directory='true'
            // multiple
            onChange={ saveFiles}
          />
        )}
        <button onClick={addRootDirectory} disabled={isScanning}>
          {!isScanning ? 'Add Root Directory' : 'Scanning Drive'}
        </button>
        <button disabled={isScanning} onClick={rescanRootDirectories}>
          ReScan Root Directories
        </button>
      </div>
    </div>
  )
}

export default RootDirectories

type Props = {
  dir: fsaDirectory
  scanning: boolean
  index: number
}

function ScanningContent({ dir, scanning, index }: Props) {
  const started = dir.isScanning
  const finished = dir.scanFinished
  if (dir.readPermission === 'false')
    return <span data-cy={`rootDirHasPermission-${index}`}>❌</span>

  if (scanning) {
    if (started && !finished)
      return (
        <span className={styles.onScanSpin}>
          <ImSpinner6 />
        </span>
      )
    if (!finished) {
      return (
        <span className={styles.content}>
          {' '}
          <IoEllipsisHorizontalSharp />
        </span>
      )
    }
  }

  return <span data-cy={`rootDirHasPermission-${index}`}>✔️</span>
}
