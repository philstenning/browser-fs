import { fsaDirectory } from '../models/types'
import { db } from '../db/setup'
import createDirectory from '../models/directories/createDirectory'
import { rootDirectoryAlreadyExists } from '../models/rootDirectories'

export default async function createLegacyDirectory(
  name: string,
  path = '/',
  rootId = '',
  parentId = '',
  depth = 0,
  creator = 'user'
) {
  const handle = {
    name,
  } as FileSystemDirectoryHandle
  //   const id = uuid()

  const isRoot = rootId === '' ? true : false
  const dir = createDirectory(
    handle,
    path,
    isRoot,
    rootId,
    parentId,
    [],
    depth,
    creator
  )
  if (isRoot) {
    const exists = await rootDirectoryAlreadyExists(dir.name)
    if (exists) return false
  }
  //
  const updated: fsaDirectory = {
    ...dir,
    isLocal: true,
    isScanning: true,
    scanFinished: false,
  }
  console.log({ updated })
  try {
    await db.directories.put(updated)
  } catch (error) {
    console.error(`Error saving directory.`)
    return false
  }

  // updated dir
  return updated
}
