import { fsaDirectory } from '../types'
import { db } from '../../db/setup'

import createDirectory from '../directories/createDirectory'
import {rootDirectoryAlreadyExists} from './'
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
  // console.log({ directory });
  const test = await rootDirectoryAlreadyExists(directory.name)

  if (!!test) {
    console.error(
      `A root directory with name: "${directory.name}" already exits in db.`
    )
    return null
  }

  try {
    directory.rootId = directory.id

    await db.directories.add(directory)
    // directory.id = id;
    // await db.directories.put(directory);

    // console.log({ directory });
    return directory
  } catch (e) {
    console.error('error creating root directory db entry')
    return null
  }
}


