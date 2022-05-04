import Dexie from "dexie";
import {
  fsaDirectory,
  fsaFile,
  fsaFileType,
  fsaState,
  fsaCollection,
  fsaError,
  fsaSetting,
  fsaExcludedFolder,
  createSetting,
  saveSetting,
  saveState,
} from "../../";
import { getCurrentState } from "../models/state";

import {FoldersToExcludeFromScanning} from 'fsa-browser'

class FsaDb extends Dexie {
  files!: Dexie.Table<fsaFile, string>;
  directories!: Dexie.Table<fsaDirectory, string>;
  userCollections!: Dexie.Table<fsaCollection, string>;
  fileTypes!: Dexie.Table<fsaFileType, number>;
  state!: Dexie.Table<fsaState, number>;
  errors!: Dexie.Table<fsaError, number>;
  settings!: Dexie.Table<fsaSetting, number>;
  excludedFolders!: Dexie.Table<fsaExcludedFolder, number>;
  constructor() {
    super("fsa-database");
    const db = this;

    // define tables and indexes
    db.version(2).stores({
      files: `id,name,path,rootId,parentId,creator,type,hidden,lastChecked,[rootId+path],[parentId+hidden]`,
      directories: `id,name,hidden,isRoot,rootId,creator,fileCount,lastChecked,parentId,readPermission,created,[isRoot+name]`,
      userCollections: `id,name,created,updated`,
      fileTypes: `++id,name,selected,hidden`,
      state: `++id,currentDirectoryId,currentFileId,currentCollectionId`,
      errors: `++id,type,success`,
      settings: `++id`,
      excludedFolders: `++id,name`,
    });
  }
}
const db = new FsaDb();

async function initializeDatabase(fileTypes: string[]) {
  console.time("initializeDb");

  await saveState(await getCurrentState());
  await createFileTypesIfNotExist(fileTypes);
  
  const setting = await createSetting(false);
  if (setting) {
    setting.sessionStarted = Date.now();
    await saveSetting(setting);
  }
  await createExcludedFoldersIfNotExist();
  await resetPermissionsOnAllDirectories();

  // see how long it has taken.
  console.timeEnd("initializeDb");
}

export { db, initializeDatabase };

async function createExcludedFoldersIfNotExist() {
  const excludedFolders = await db.excludedFolders.count();
  if (!excludedFolders) {
    for(const name of FoldersToExcludeFromScanning)  {
       try {
        await   db.excludedFolders.add({name})
       } catch (error) {
         console.error(`Error adding excluded folder names ${error}`)
       }
    }

  }
}

async function createFileTypesIfNotExist(fileTypes: string[]) {
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
}

export async function resetPermissionsOnAllDirectories() {
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
}
