import { saveSetting,db,fsaSetting } from "../../";

export async function createSetting(
  save: boolean = true,
  setting?: fsaSetting
) {
  // if there is no props look for previous
  // to clone it.
  if (!setting) {
    setting = await getCurrentSetting();
  }
  if (!save) return setting;
  return await saveSetting(setting);
}

export async function getCurrentSetting() {
  try {
    const setting = await db.settings.toCollection().last();
    if (!!setting) {
      if (Object.hasOwn(setting, "id")) delete setting.id;
      return { ...setting };
    }
  } catch (error) {
    console.error(`Error getting previous Setting ${error}`);
  }
  return createInitialSetting();
}

export function createInitialSetting() {
  const now = Date.now();
  const setting: fsaSetting = {
    cleanUpFiles: true,
    cleanUpCollections: true,
    sessionStarted: now,
    lastScanned: now,
  };
  return setting;
}
