import { checkPermissionsOfHandle } from 'fsa-browser'
import { db, fsaFile } from '../'

export default async function checkHandlePermission(file: fsaFile) {
  const res = await checkPermissionsOfHandle(file.handle)
  if (res) {
    const dirs = await db.directories
      .where('rootId')
      .equals(file.rootId)
      .toArray()
    dirs.forEach((d) => (d.readPermission = 'true'))
    await db.directories.bulkPut(dirs)
  }
}
