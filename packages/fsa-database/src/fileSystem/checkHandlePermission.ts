import { checkPermissionsOfHandle } from '@philstenning/fsa-browser'
import { fsaFile } from '../models/types'
import { db } from '../db/setup'

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
