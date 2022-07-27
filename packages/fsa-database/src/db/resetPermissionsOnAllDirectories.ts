import { db } from './setup'

/**
 * Resets all permissions to false on all Directories
 * this is usually called after the browser has refreshed as
 * you no longer have permissions on any file handles.
 * @category Database
 */
export default async function resetPermissionsOnAllDirectories() {
  try {
    const dirs = (await db.directories.toArray()).filter(
      (dir) => dir.isLocal === false
    )
    if (dirs) {
      dirs.forEach((d) => {
        d.readPermission = 'false'
      })
      await db.directories.bulkPut(dirs)
    }
  } catch (e) {
    console.error(`Error updating directories permissions\n ${e}`)
  }
}
