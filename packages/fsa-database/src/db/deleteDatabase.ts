import { db, FsaDb } from './setup'

// after calling this the browser need to refresh
export default async function deleteDatabase() {
  db.close()
  const dbToDel = new FsaDb()
  await dbToDel.delete()
}
