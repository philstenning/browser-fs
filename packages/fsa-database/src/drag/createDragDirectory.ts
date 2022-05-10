import { db, createDirectory, fsaDirectory } from '../'
import { rootDirectoryAlreadyExists } from '../models/rootDirectories'
import { v4 as uuid } from 'uuid'

/**
 * Creates a root directory for dragNDrop files in the database.
 * @param {string} name the name you want to call the directory.
 * @returns {Promise<fsaDirectory| false>} A promise that resolves to a newly created fsaDirectory or false if it did not compleat.
 */
export default async function createDragDirectory(
  name: string = 'localDrag'
): Promise<fsaDirectory | false> {
  const handle: FileSystemDirectoryHandle = {
    name,
  } as FileSystemDirectoryHandle
  const id = uuid()
  const dir = createDirectory(handle, '/', true, id, id, [], 0, 'user', 'true')

  // can't have multiple dirs with the same name.
  const exists = await rootDirectoryAlreadyExists(dir.name)
  if (exists) return false

  // updated dir
  const updated: fsaDirectory = { ...dir, isLocal: true }
  // add to database
  const dirId = await db.directories.add(updated)
  if (dirId) {
    return updated
  }
  return false
}
