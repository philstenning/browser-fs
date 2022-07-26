import { fsaSetting } from '../types'
import saveSetting from '../settings/saveSetting'
import getCurrentSetting from './getCurrentSetting'

/**
 * @category Settings
 */
export default async function createSetting(
  save: boolean = true,
  setting?: fsaSetting
) {
  // if there is no props look for previous to clone it.
  if (!setting) {
    setting = await getCurrentSetting()
  }
  if (!save) return setting
  return await saveSetting(setting)
}
