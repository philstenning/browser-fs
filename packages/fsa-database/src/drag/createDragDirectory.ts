import { fsaDirectory } from '../models/types'
import { db } from '../db/setup'
import createDirectory from '../models/directories/createDirectory'
import { rootDirectoryAlreadyExists } from '../models/rootDirectories'
import { v4 as uuid } from 'uuid'

/**
 * Creates a root directory for dragNDrop files in the database.
 * @param {string} name the name you want to call the directory.
 * @returns {Promise<fsaDirectory| false>} A promise that resolves to a newly created fsaDirectory or false if it did not compleat.
 */
export default async function createDragDirectory(
  name: string = 'localDrag',
  path = '/',
  isRoot = true,
  rootId: string = '',
  save = true
): Promise<fsaDirectory | false> {
  const handle: FileSystemDirectoryHandle = {
    name,
  } as FileSystemDirectoryHandle
  const id = uuid()

  const dir = createDirectory(
    handle,
    path,
    isRoot,
    rootId === '' ? id : rootId,
    id,
    [],
    0,
    'user',
    'true'
  )
  // can't have multiple dirs with the same name.
  if (isRoot) {
    const exists = await rootDirectoryAlreadyExists(dir.name)
    if (exists) return false
  }
  const updated: fsaDirectory = { ...dir, isLocal: true, isScanning: true }

  if (save) {
    try {
      await db.directories.put(updated)
    } catch (error) {
      console.error(`Error saving directory.`)
      return false
    }
  }
  // updated dir
  return updated
}
