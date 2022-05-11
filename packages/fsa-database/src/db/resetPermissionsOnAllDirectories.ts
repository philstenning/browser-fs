import { db } from './'

export default async function resetPermissionsOnAllDirectories() {
  try {
    const dirs = await (await db.directories.toArray()).filter(dir=>dir.isLocal===false)
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
