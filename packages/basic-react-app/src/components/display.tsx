import React, { useState } from 'react'
import DirectoryFiles from './directoryFiles'
import CurrentCollection from './currentCollection'
import styles from './display.module.css'
function Display() {
  const [directorySelected, setDirectorySelected] = useState(true)
  return (
    <div className={styles.container}>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
        explicabo aspernatur tempore debitis quod soluta beatae expedita odio
        unde fugiat, quis quibusdam possimus voluptatum molestiae tempora minima
        minus dolore. Asperiores?
      </p>
      {/* <header className={styles.header}>
        <h2 className={styles.tab} onClick={() => setDirectorySelected(true)}>
          Files
        </h2>
        <h2 className={styles.tab} onClick={() => setDirectorySelected(false)}>
          Collection
        </h2>
      </header>
      {directorySelected && <DirectoryFiles />}
      {!directorySelected && <CurrentCollection />} */}
    </div>
  )
}

export default Display
