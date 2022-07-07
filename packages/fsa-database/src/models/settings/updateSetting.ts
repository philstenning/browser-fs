import { db } from '../../db/setup'
import { fsaSetting } from '../types'

export default async function updateSetting(setting: fsaSetting) {
  try {
    delete setting.id
    const id = await db.settings.add(setting as fsaSetting)
    return { ...setting, id } as fsaSetting
  } catch (e) {
    console.error(`Error updating Setting ${e}`)
    return null
  }
}
