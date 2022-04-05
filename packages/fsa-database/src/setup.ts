import Dexie from "dexie";

import {fsaDirectory} from './models/types'
class FsaDb extends Dexie {
  // files:Dexie.Table<IDbFile,number>;
  directories: Dexie.Table<fsaDirectory, number>;
  // collections:Dexie.Table<IDbCollection,number>;

  constructor() {
    super("fsa-database");
    const db = this;

    // define tables and indexes
    db.version(1).stores({
      // files:`++id name path created`,
      directories: `++id,name,created,hidden,isRoot`,
      // collections:`++id name created`
    });
  }
}

// export let db: FsaDb;
// export function createDatabase() {
//   db = new FsaDb();
// }
// db.folders.each( folder=> folder.log())

export const db = new FsaDb()

// db.folders.add({})