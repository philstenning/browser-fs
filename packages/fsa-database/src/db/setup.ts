import Dexie from 'dexie'
import {
  fsaDirectory,
  fsaFile,
  fsaFileType,
  fsaState,
  fsaCollection,
  fsaError,
  fsaSetting,
  fsaExcludedDirectory,
} from '../'

export class FsaDb extends Dexie {
  files!: Dexie.Table<fsaFile, string>
  directories!: Dexie.Table<fsaDirectory, string>
  userCollections!: Dexie.Table<fsaCollection, string>
  fileTypes!: Dexie.Table<fsaFileType, number>
  state!: Dexie.Table<fsaState, number>
  errors!: Dexie.Table<fsaError, number>
  settings!: Dexie.Table<fsaSetting, number>
  excludedDirectories!: Dexie.Table<fsaExcludedDirectory, number>

  constructor() {
    super('fsa-database')
    const db = this

    // define tables and indexes
    db.version(2).stores({
      files: `id,name,path,rootId,parentId,creator,type,hidden,uniqueName,lastChecked,[rootId+path],[parentId+hidden]`,
      directories: `id,name,hidden,isRoot,rootId,creator,fileCount,lastChecked,parentId,readPermission,created,[isRoot+name]`,
      userCollections: `id,name,created,updated`,
      fileTypes: `++id,name,selected,hidden`,
      state: `++id,currentDirectoryId,currentFileId,currentCollectionId`,
      errors: `++id,type,success`,
      settings: `++id`,
      excludedDirectories: `++id,name`,

    })
  }
}
export const db = new FsaDb()
