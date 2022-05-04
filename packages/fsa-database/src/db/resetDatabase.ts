import {
  db,
  getCurrentSetting,
  initialDbState,
  saveState,
  saveSetting,
  initializeDatabase,
} from "../";
import { FsaDb } from "./setup";
export async function resetDatabase() {
  const settings = await getCurrentSetting();
  await db.userCollections.clear();
  await db.files.clear();
  await db.directories.clear();
  await db.settings.clear();
  await db.errors.clear();
  await db.state.clear();
  await saveState(initialDbState);
  await saveSetting(settings);
}
// after calling this the browser need to refresh
export async function deleteDatabase() {
  db.close();
  const dbToDel = new FsaDb();
  await dbToDel.delete();
}
