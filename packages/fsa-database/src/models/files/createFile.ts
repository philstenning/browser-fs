import { fsaFile } from '../types'
import { v4 as uuid } from 'uuid'
import bytesToSize from '../../utils/bytesToSize'

/**
 * A fsaFile factory function used to create each file as it
 * is added to the database.
 * @param {FileSystemFileHandle } handle - fileSystemFileHandle
 * @param {string} parentId id of the parent directory
 * @param { string }rootId   id of the root directory
 * @param { string }path  the path relative from the root directory
 * @param { string }type  the extension type
 * @param { string } [name=handle.name] if not supplied it is the handle.name
 * @param { string }  [creator] - not yet implemented
 * @param { boolean} [printed=false] -
 * @param {string[]} tags
 * @param { string } description
 * @param { string } imageUrl
 * @param { string[] } userCollectionIds
 * @returns {fsaFile} A fsa file object
 */
export default async function createFile(
  handle: FileSystemFileHandle,
  parentId: string,
  rootId: string,
  path: string,
  type: string,
  name: string = handle.name,
  creator = 'UserId',
  printed: boolean = false,
  tags: string[],
  description: string = '',
  imageUrl: string = '',
  userCollectionIds: string[] = []
) {
  let size = '0 mb'
  if (handle?.name) {
    size = bytesToSize((await handle.getFile()).size)
  } else {
    console.log('no handle no size')
  }
  const createdAt = Date.now()
  const file: fsaFile = {
    id: uuid(),
    name,
    handle,
    rootId,
    type,
    path,
    creator,
    parentId,
    printed,
    tags,
    description,
    created: createdAt,
    updated: createdAt,
    imageUrl,
    userCollectionIds,
    order: 0,
    hidden: 'false',
    InitialParentId: parentId,
    lastChecked: createdAt,
    size,
    uniqueName: null,
  }
  return file
}
