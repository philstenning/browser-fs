import { fsaSetting } from '../types'

export default function createInitialSetting() {
  const now = Date.now()
  const setting: fsaSetting = {
    cleanUpFiles: true,
    sessionStarted: now,
    lastScanned: now,
    autoSaveCollections: false,
    scanInterval: 0,
    allowDndFiles:false,
    retainRootDirectoriesOnReset:true
  }
  return setting
}
