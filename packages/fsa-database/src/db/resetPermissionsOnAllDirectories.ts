import { db } from './'

export default async function resetPermissionsOnAllDirectories() {
  try {
    const dirs = await db.directories.toArray()
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
