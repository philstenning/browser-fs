import React from 'react'
import {
  importDatabase,
  exportDatabase,
  fetchDatabase,
  resetDatabase,
  deleteDatabase
} from '@philstenning/fsa-database'

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
    </div>
  )
}

export default Start
