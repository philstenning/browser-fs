import { db } from '../../db/setup'
import { fsaDirectory } from '../types'
/**
 * updates all the directories with the same rootId with the
 * value from the readPermission param.
 * @param rootId {string}
 * @param readPermission {boolean=} [readPermission=true]
 */
export async function updatePermissionsForRootDirAndChildren(
  rootId: string,
  readPermission: boolean | null = true
) {
  const dirs = await db.directories.where({ rootId }).toArray()
  const updatedDirs: fsaDirectory[] = []
  dirs.forEach((dir) =>
    updatedDirs.push({
      ...dir,
      readPermission: readPermission ? 'true' : 'false'
    })
  )
  await db.directories.bulkPut(updatedDirs)
}
