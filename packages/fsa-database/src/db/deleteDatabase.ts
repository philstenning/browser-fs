import { db, FsaDb } from './setup'


/**
 *  Removes the database from the browser with it's data,
 *  after calling this the browser need to refresh
 * @category Database
 */
export default async function deleteDatabase() {
  db.close()
  const dbToDel = new FsaDb()
  await dbToDel.delete()
}
