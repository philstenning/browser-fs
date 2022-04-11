import Dexie from "dexie";

import {
  fsaDirectory,
  fsaFile,
  fsaFileType,
  fsaState,
  fsaCollection,
} from "../models/types";
class FsaDb extends Dexie {
  files!: Dexie.Table<fsaFile, number>;
  directories!: Dexie.Table<fsaDirectory, number>;
  fileTypes!: Dexie.Table<fsaFileType, number>;
  state!: Dexie.Table<fsaState, number>;
  userCollections!: Dexie.Table<fsaCollection, number>;

  constructor() {
    super("fsa-database");
    const db = this;

    // define tables and indexes
    db.version(2).stores({
      files: `++id,name,path,created,rootId,parentId,creator,type`,
      directories: `++id,name,created,hidden,isRoot,rootId,creator`,
      fileTypes: `++id,name,selected,hidden`,
      state: `++id,currentDirectory,currentFile,currentCollection`,
      userCollections: `++id,name,updated,files`,
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
