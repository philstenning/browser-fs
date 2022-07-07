import { importInto } from 'dexie-export-import'
import { ImportProgress } from 'dexie-export-import/dist/import'
import { db } from './setup'
import resetPermissionsOnAllDirectories from './resetPermissionsOnAllDirectories'


const logProgress = (data: ImportProgress) => {
  if (!!data.done) {
    console.log(` database import finished 👍`);
  }
  return true
}

/**
 * Gets the db from the server with fetch()
 * this is used for testing only as the file handles
 * do not serialize - this should be stubbed in cypress
 * and put in the fixtures directory.
 * @param {string}fileName
 */
export default async function fetchDatabase(
  fileName: string = 'testing/fsaDb.json'
) {
  console.time('FetchAndUpdateDb')
  const request = new Request(fileName)

  try {
    const response = await fetch(request)
    if (response.ok) {
      const blob = await response.blob()
      await importInto(db, blob, {
        clearTablesBeforeImport: true,
        progressCallback: logProgress
      })
      await resetPermissionsOnAllDirectories()
    }
    console.timeEnd('FetchAndUpdateDb')
  } catch (error) {
    console.error(`Error fetching database ${error}`)
  }
}
