import { exportDB } from 'dexie-export-import'
import { db } from './setup'

export default async function exportDatabase() {
  try {
    const blob = await exportDB(db, {})

    const result = await window.showSaveFilePicker({
      suggestedName: 'fsaDb.data'
    })
    const writableFileStream = await result.createWritable()
    await writableFileStream.write(blob)
    writableFileStream.close()
  } catch (error) {
    console.error(`Error exporting database ${error}`)
  }
}


