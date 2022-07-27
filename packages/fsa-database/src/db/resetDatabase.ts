import saveSetting from '../models/settings/saveSetting'
import saveState from '../models/state/saveState'
import getCurrentSetting from '../models/settings/getCurrentSetting'
import { initialDbState } from '../models/state/initialState'
import { db } from './setup'

/**
 * Clears all the data from the database, the structure is 
 * unchanged.
 * @category Database
 */
export default async function resetDatabase() {
  try {
    const settings = await getCurrentSetting()
    const dirs = await db.directories.where({ isRoot: 'true' }).toArray()

    await db.userCollections.clear()
    await db.files.clear()
    await db.directories.clear()
    await db.settings.clear()
    await db.errors.clear()
    await db.state.clear()
    await saveState(initialDbState)
    await saveSetting(settings)
    if (settings.retainRootDirectoriesOnReset) {
      await db.directories.bulkAdd(dirs)
    }
  } catch (error) {
    console.error(`Error resetting the database: ${error}`)
  }
}
