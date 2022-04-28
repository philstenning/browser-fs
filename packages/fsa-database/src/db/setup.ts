import Dexie from "dexie";
// import  'dexie-observable'
import {
  fsaDirectory,
  fsaFile,
  fsaFileType,
  fsaState,
  fsaCollection,
  fsaError,
  fsaSetting,
} from "../models/types";
import { createSetting } from "../models/settings/createSetting";

class FsaDb extends Dexie {
  files!: Dexie.Table<fsaFile, string>;
  directories!: Dexie.Table<fsaDirectory, string>;
  userCollections!: Dexie.Table<fsaCollection, string>;
  fileTypes!: Dexie.Table<fsaFileType, number>;
  state!: Dexie.Table<fsaState, number>;
  errors!: Dexie.Table<fsaError, number>;
  settings!: Dexie.Table<fsaSetting, number>;
  constructor() {
    super("fsa-database");
    const db = this;

    // define tables and indexes
    db.version(2).stores({
      files: `id,name,path,rootId,parentId,creator,type,hidden,lastChecked,[rootId+path],[parentId+hidden]`,
      directories: `id,name,hidden,isRoot,rootId,creator,fileCount,lastChecked,parentId,readPermission,[isRoot+name]`,
      userCollections: `id,name,created,updated`,
      fileTypes: `++id,name,selected,hidden`,
      state: `++id,currentDirectory,currentFile,currentCollection`,
      errors: `++id,type,success`,
      settings: `++id`,
    });
  }
}
const db = new FsaDb();

async function initializeDatabase(fileTypes: string[]) {
  console.time("initializeDb");

  await createFileTypesIfNotExist(fileTypes);

  await createSettingsIfNotExist();

  await resetPermissionsOnAllDirectories();

  // see how long it has taken.
  console.timeEnd("initializeDb");
}

export { db, initializeDatabase };

async function createSettingsIfNotExist() {
  const setting = await db.settings.toCollection().last();
  if (setting) {
    const {
      lastScanned,
      cleanCollectionsWhenRemoved,
      cleanFilesFromCollections,
    } = setting;

    await createSetting(
      lastScanned,
      cleanCollectionsWhenRemoved,
      cleanFilesFromCollections
    );
  } else {
    await createSetting();
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

async function resetPermissionsOnAllDirectories() {
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
