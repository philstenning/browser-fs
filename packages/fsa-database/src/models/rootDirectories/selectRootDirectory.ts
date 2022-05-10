import {
  selectRootDirectoryOnLocalDrive,
  scanLocalDrive,
  VirtualRootDirectoryType,
} from 'fsa-browser'
import addRootDirectory from './addRootDirectory'

export default async function selectRootDirectory() {
  const virtualDir = await selectRootDirectoryOnLocalDrive()
  if (!virtualDir) return

  await addRootDirectory(virtualDir)
}
