import { v4 as uuid } from 'uuid'
import { fsaDirectory } from '../types'

export default function createDirectory(
  handle: FileSystemDirectoryHandle,
  path: string,
  isRoot: boolean,
  rootId: string,
  parentId: string | null,
  fileIds = [],
  depth = 0,
  creator = 'user',
  readPermission: 'true' | 'false' = 'false'
) {
  const createdAt = Date.now()
  const id = uuid()

  const directory: fsaDirectory = {
    id,
    created: createdAt,
    updated: createdAt,
    depth,
    handle,
    path,
    rootId: isRoot ? id : rootId, // if it isRoot set this same as id.
    isRoot: isRoot ? 'true' : 'false',
    label: '',
    name: handle.name,
    creator,
    fileIds,
    fileCount: 0,
    hidden: 'false',
    parentId,
    lastChecked: createdAt,
    readPermission,
    isScanning: false,
    scanFinished: true,
    scanDepth:100,
    isLocal:false
  }
  return directory
}
