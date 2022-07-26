import { fsaState } from '../types'


/**
 * @category State
 */
export const initialDbState: fsaState = {
  currentCollectionId: 'null',
  currentDirectoryId: 'null',
  currentFileId: 'null',
  currentRootDirectoryId: 'null',
  isScanning: false,
}
