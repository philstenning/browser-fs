import Dexie from "dexie";

// import {IDbCollection,IDbFile,IDbFolder,IUser,ITag} from './types'
import { Folder } from "./models/Folder";

class FsaDb extends Dexie {
  // files:Dexie.Table<IDbFile,number>;
  folders: Dexie.Table<Folder, number>;
  // collections:Dexie.Table<IDbCollection,number>;

  constructor() {
    super("fsa-database");
    const db = this;

    // define tables and indexes
    db.version(1).stores({
      // files:`++id name path created`,
      folders: `++id,name,created,updated`,
      // collections:`++id name created`
    });

    this.folders.mapToClass(Folder);
  }
}

// export let db: FsaDb;
// export function createDatabase() {
//   db = new FsaDb();
// }
// db.folders.each( folder=> folder.log())

export const db = new FsaDb()