import { fsaSetting, fsaSettingCreate } from "../types";
import { db } from "../../db/setup";

export async function createSetting(
  lastScanned?: number,
  cleanCollectionsWhenRemoved: boolean = true,
  cleanFilesFromCollections: boolean = true
) {
  const now = Date.now();
  const setting: fsaSettingCreate = {
    cleanCollectionsWhenRemoved,
    cleanFilesFromCollections,
    sessionStarted: now,
    lastScanned: lastScanned ?? now,
  };
  try {
    const id = await db.settings.add(setting as fsaSetting);
    return { ...setting, id } as fsaSetting;
  } catch (e) {
    console.error(`Error creating Setting ${e}`);
    return null;
  }
}
