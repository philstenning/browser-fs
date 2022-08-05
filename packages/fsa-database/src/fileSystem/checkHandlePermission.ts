import { checkPermissionsOfHandle } from '@philstenning/fsa-browser'
import { fsaDirectory, fsaFile } from '../models/types'
import { db } from '../db/setup'

/**
 * @category Local File System
 */
export default async function checkHandlePermission(file: fsaFile | fsaDirectory) {
  
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
