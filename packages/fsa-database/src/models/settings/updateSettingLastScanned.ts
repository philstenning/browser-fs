import { db } from '@db/setup'
import updateSetting from './updateSetting'

export default async function updateSettingLastScanned(
  timeOfScan: number = Date.now()
) {
  const setting = await db.settings.toCollection().last()
  if (setting) {
    setting.lastScanned = timeOfScan
    await updateSetting(setting)
  }
}
