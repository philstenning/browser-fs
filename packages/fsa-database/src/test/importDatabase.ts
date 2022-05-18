import { importInto } from 'dexie-export-import'
import { ImportProgress } from 'dexie-export-import/dist/import'

import { db } from '../db'
import resetPermissionsOnAllDirectories from '../db/resetPermissionsOnAllDirectories'
import data from './fsaDb.json'
export default  function testImportDatabase() {
  try {

    // convert json to a blob for dexie importInto function.
    const str = JSON.stringify(data)
    const bytes = new TextEncoder().encode(str)
    const blob = new Blob([bytes],{ type:'application/json;charset=utf-8'})

     importInto(db, blob, {
      clearTablesBeforeImport: true,
      progressCallback: logProgress,
    }).then(f=>console.log('f'))

    // await resetPermissionsOnAllDirectories()
    return true
  } catch (error) {
    console.error(`Error importing database ${error}`)
  }
  return false
}

const logProgress = (data: ImportProgress) => {
  console.log('rows imported:', data.totalRows)
  return true
}
