import { fsaSetting } from '../types'
import updateSetting from './updateSetting'

/**
 * @category Settings
 */
export default async function saveSetting(setting: fsaSetting) {
  await updateSetting(setting)
}
