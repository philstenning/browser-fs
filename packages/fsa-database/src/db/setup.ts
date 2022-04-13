import Dexie from "dexie";
import  'dexie-observable'
import {
  fsaDirectory,
  fsaFile,
  fsaFileType,
  fsaState,
  fsaCollection,
  fsaError
} from "../models/types";
class FsaDb extends Dexie {
  files!: Dexie.Table<fsaFile, string>;
  directories!: Dexie.Table<fsaDirectory, string>;
  userCollections!: Dexie.Table<fsaCollection, string>;
  fileTypes!: Dexie.Table<fsaFileType, number>;
  state!: Dexie.Table<fsaState, number>;
  errors!: Dexie.Table<fsaError, number>;
  constructor() {
    super("fsa-database");
    const db = this;

    // define tables and indexes
    db.version(2).stores({
      files: `$$id,name,path,created,rootId,parentId,creator,type`,
      directories: `$$id,name,created,hidden,isRoot,rootId,creator`,
      userCollections: `$$id,name,created,updated`,
      fileTypes: `++id,name,selected,hidden`,
      state: `++id,currentDirectory,currentFile,currentCollection`,
      errors: `++id,type,success`,
    });
  }
}
const db = new FsaDb();
async function initializeDb(fileTypes: string[]) {
  const ft = await db.fileTypes.count();
  if (ft > 0) return; // only want to add if no entries already
  if (!!fileTypes.length) {
    for (const fType of fileTypes) {
      const name = fType.replace(".", "").trim().toLowerCase();
      const _fileType: fsaFileType = { name, hidden: false, selected: true };
      await db.fileTypes.add(_fileType);
    }
  }
}

export { db, initializeDb };
