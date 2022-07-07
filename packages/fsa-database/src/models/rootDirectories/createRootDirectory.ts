import { fsaDirectory } from '../types'
import { db } from '../../db/setup'
import createDirectory from '../directories/createDirectory'
import rootDirectoryAlreadyExists from './rootDirectoryAlreadyExists'

export default async function createRootDirectory(
  handle: FileSystemDirectoryHandle,
  creator: string = 'user'
): Promise<fsaDirectory | null> {
  const directory = createDirectory(
    handle,
    '/',
    true,
    '',
    null,
    [],
    0,
    creator,
    'true'
  )
  if (!!(await rootDirectoryAlreadyExists(directory.name))) {
    console.error(
      `A root directory with name: "${directory.name}" already exits in db.`
    )
    return null
  }
  try {
    await db.directories.add({ ...directory, rootId: directory.id })
    return directory
  } catch (e) {
    console.error('error creating root directory db entry')
    return null
  }
}
