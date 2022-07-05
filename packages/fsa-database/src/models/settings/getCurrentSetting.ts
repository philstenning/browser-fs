import { db } from '@db/setup'
import createInitialSetting from './createInitialSetting'

export default async function getCurrentSetting() {
  try {
    const setting = await db.settings.toCollection().last()
    if (!!setting) {
      delete setting.id
      return { ...setting }
    }
  } catch (error) {
    console.error(`Error getting previous Setting ${error}`)
  }
  return createInitialSetting()
}
