import {
  getCurrentSetting,
  initialDbState,
  saveState,
  saveSetting,
  db
} from '../'

export default async function resetDatabase() {
  const settings = await getCurrentSetting()
  await db.userCollections.clear()
  await db.files.clear()
  await db.directories.clear()
  await db.settings.clear()
  await db.errors.clear()
  await db.state.clear()
  await saveState(initialDbState)
  await saveSetting(settings)
}
