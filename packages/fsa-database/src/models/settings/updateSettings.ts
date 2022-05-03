import { db, fsaSetting } from "../../";

export async function updateSetting(setting: fsaSetting) {
  try {
    if (Object.hasOwn(setting, "id")) delete setting.id;
    const id = await db.settings.add(setting as fsaSetting);
    return { ...setting, id } as fsaSetting;
  } catch (e) {
    console.error(`Error creating Setting ${e}`);
    return null;
  }
}

export async function updateSettingLastScanned(
  timeOfScan: number = Date.now()
) {
  const setting = await db.settings.toCollection().last();
  if (setting) {
    setting.lastScanned = timeOfScan;
    await updateSetting(setting);
  }
}

export async function saveSetting(setting: fsaSetting) {
  await updateSetting(setting);
}
