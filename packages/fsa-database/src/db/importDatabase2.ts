// @ts-ignore
import idb from 'indexeddb-export-import'
import { db } from '../db/setup'
import resetPermissionsOnAllDirectories from './resetPermissionsOnAllDirectories'

export default async function importDatabase() {
  try{ 
   const backendDB = db.backendDB
    // @ts-ignore
    const result = await window.showOpenFilePicker()
    if (result) {
      const blob = await result[0].getFile()

      const reader = new FileReader()

      reader.onloadend = (evt: any) => {
        // console.log(evt?.target.result)
        const jsonString = evt.target.result
        idb.clearDatabase(backendDB, (err: Error) => {
          if (err) {
            console.log(err)
          } else {
            console.log('db.cleaned')
            // idb.importFromJsonString(backendDB, jsonString, (err: Error) => {
            //   if (err) {
            //     console.error(err)
            //   } else {
            //     console.log('data loaded.')
            //   }
            // })
          }
        })
      }

      reader.readAsText(blob)

      //   await resetPermissionsOnAllDirectories()
    }
  } catch (error) {
    console.error(`Error importing database ${error}`)
  }
}


