import { fsaSetting} from "../types";
import { db } from "../../db/setup";

export async function updateSetting(setting: fsaSetting) {
  try {
    //@ts-ignore  we don't want the id to
    delete setting.id;
    await db.settings.add(setting);
    return true;
  } catch (e) {
    console.error(`Error updating setting`);
    return false;
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
