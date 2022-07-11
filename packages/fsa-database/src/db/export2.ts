// @ts-ignore  - no types for package.
import idb from 'indexeddb-export-import'
import { db } from '../db/setup'

export default function exportDatabase2() {
  try {
    const backendDb = db.backendDB()
    // @ts-ignore
    const data = idb.exportToJsonString(backendDb, (err, jsonString) => {
      if (err) {
        console.error(err)
      } else {
        console.log(jsonString)
      }
    })
  } catch (error) {}
}

