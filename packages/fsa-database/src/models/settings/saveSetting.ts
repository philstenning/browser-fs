import { fsaSetting } from '../types'
import updateSetting from './updateSetting'

export default async function saveSetting(setting: fsaSetting) {
  await updateSetting(setting)
}
