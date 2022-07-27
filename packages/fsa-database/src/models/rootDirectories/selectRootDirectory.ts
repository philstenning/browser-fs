import { selectRootDirectoryOnLocalDrive } from '@philstenning/fsa-browser'
import addRootDirectory from './addRootDirectory'

/**
 * @category Root Directories
 * @returns
 */
export default async function selectRootDirectory() {
  const virtualDir = await selectRootDirectoryOnLocalDrive()
  if (!virtualDir) return

  await addRootDirectory(virtualDir)
}
