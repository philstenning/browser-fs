import Dexie from "dexie";
// import  'dexie-observable'
import {
  fsaDirectory,
  fsaFile,
  fsaFileType,
  fsaState,
  fsaCollection,
  fsaError,
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
      files: `id,name,path,rootId,parentId,creator,type,hidden,lastChecked`,
      directories: `id,name,hidden,isRoot,rootId,creator,fileCount,lastChecked,parentId,readPermission`,
      userCollections: `id,name,created,updated`,
      fileTypes: `++id,name,selected,hidden`,
      state: `++id,currentDirectory,currentFile,currentCollection`,
      errors: `++id,type,success`,
    });
  }
}
const db = new FsaDb();

async function initializeDb(fileTypes: string[]) {
  console.time("initializeDb");

  try {
    const ft = await db.fileTypes.count();
    // if (ft > 0) return; // only want to add if no entries already
    if (ft === 0 && !!fileTypes.length) {
      for (const fType of fileTypes) {
        const name = fType.replace(".", "").trim().toLowerCase();
        const _fileType: fsaFileType = { name, hidden: false, selected: true };
        await db.fileTypes.add(_fileType);
      }
    }
  } catch (e) {
    console.error(`Error creating fileTypes\n ${e}`);
  }

  // reset permissions on all directories
  try {
    const dirs = await db.directories.toArray();
    if (dirs) {
      dirs.forEach((d) => {
        d.readPermission = "false";
      });
      await db.directories.bulkPut(dirs);
    }
  } catch (e) {
    console.error(`Error updating directories permissions\n ${e}`);
  }
  console.timeEnd("initializeDb");
}

export { db, initializeDb };
