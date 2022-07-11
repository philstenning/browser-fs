import React from 'react'
import {
  importDatabase,
  exportDatabase,
  fetchDatabase,
  resetDatabase,
  deleteDatabase,
  exportDatabase2,importDb2
} from 'fsa-database'

//@ts-ignore
import styles from './start.module.css'

function Start() {
  return (
    <div className={styles.container}>
      <button id="export_btn" onClick={exportDatabase}>
        export
      </button>
      <button id="import_btn" onClick={importDatabase}>
        import
      </button>
      <button id="request_btn" onClick={() => fetchDatabase()}>
        fetch
      </button>
      <button id="reset_btn" onClick={resetDatabase}>
        Reset
      </button>
      <button id="delete_btn" onClick={deleteDatabase}>
        delete
      </button>
      <button id="export2_btn" onClick={exportDatabase2}>
        expoer2
      </button>
      <button id="export2_btn" onClick={importDb2}>
        import 2
      </button>
    </div>
  )
}

export default Start
