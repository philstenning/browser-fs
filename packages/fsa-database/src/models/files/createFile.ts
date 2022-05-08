import { fsaFile } from '../types'
import { v4 as uuid } from 'uuid'
import bytesToSize from '../../utils/bytesToSize'

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
  const size = bytesToSize((await handle.getFile()).size)
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
    uniqueName: null
  }

  return file
}


