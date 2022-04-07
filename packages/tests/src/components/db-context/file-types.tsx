import React from 'react'
import {useFsaDbContext} from 'react-fsa-browser'
import styles from './file-types.module.css'
const FileTypes = () => {
    const {fileTypes} = useFsaDbContext()
  return (
      <div className={styles.container}>
<h3 className={styles.header}>File Types</h3>
    <ul className={styles.list}>
        {fileTypes.map((ft,index)=>(
            <li className={styles.listItem} key={index}>{ft}</li>
            ))}
    </ul>
            </div>
  )
}

export default FileTypes