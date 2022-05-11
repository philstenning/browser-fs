import { db } from '../../db'

export default async function getFileTypeNames() {
  try {
    const res = await db.fileTypes
      .toArray()
      .then((_fileType) => _fileType.map((_fileType) => _fileType.name))
    return res
  } catch (error) {
    console.error(`Error getting fileType names from database. ${error}`)
  }
}
