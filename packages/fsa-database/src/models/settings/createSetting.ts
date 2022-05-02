import { fsaSetting } from "../types";
import { db } from "../../db/setup";

// export async function createSetting(
//   lastScanned?: number,
//   removeFilesFromDriveWhenCollectionRemoved: boolean = true,
//   removeFileFromDriveIfRemovedFromCollection: boolean = true
// ) {
//   const now = Date.now();
//   const setting: fsaSetting = {
//     removeFilesFromDriveWhenCollectionRemoved,
//     removeFileFromDriveIfRemovedFromCollection,
//     sessionStarted: now,
//     lastScanned: lastScanned ?? now,
//   };
// }

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

function createInitialSetting() {
  const now = Date.now();
  const setting: fsaSetting = {
    cleanUpFiles: true,
    cleanUpCollections: true,
    sessionStarted: now,
    lastScanned: now,
  };
  return setting;
}

export async function saveSetting(setting: fsaSetting) {
  try {
    if (Object.hasOwn(setting, "id")) delete setting.id;
    const id = await db.settings.add(setting as fsaSetting);
    return { ...setting, id } as fsaSetting;
  } catch (e) {
    console.error(`Error creating Setting ${e}`);
    return null;
  }
}
