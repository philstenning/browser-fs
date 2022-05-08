import { fsaFileType, createSetting, saveSetting, saveState, db } from '../../'
import { getCurrentState } from '../models/state'
import { FoldersToExcludeFromScanning } from 'fsa-browser'
import resetPermissionsOnAllDirectories from './resetPermissionsOnAllDirectories'

export default async function initializeDatabase(fileTypes: string[]) {
  console.time('initializeDb')

  await saveState(await getCurrentState())
  await createFileTypesIfNotExist(fileTypes)

  const setting = await createSetting(false)
  if (setting) {
    setting.sessionStarted = Date.now()
    await saveSetting(setting)
  }
  await createExcludedFoldersIfNotExist()
  await resetPermissionsOnAllDirectories()

  // see how long it has taken.
  console.timeEnd('initializeDb')
}

async function createExcludedFoldersIfNotExist() {
  const excludedFolders = await db.excludedDirectories.count()
  if (!excludedFolders) {
    for (const name of FoldersToExcludeFromScanning) {
      try {
        await db.excludedDirectories.add({ name })
      } catch (error) {
        console.error(`Error adding excluded folder names ${error}`)
      }
    }
  }
}

async function createFileTypesIfNotExist(fileTypes: string[]) {
  try {
    const ft = await db.fileTypes.count()
    // if (ft > 0) return; // only want to add if no entries already
    if (ft === 0 && !!fileTypes.length) {
      for (const fType of fileTypes) {
        const name = fType.replace('.', '').trim().toLowerCase()
        const _fileType: fsaFileType = { name, hidden: false, selected: true }
        await db.fileTypes.add(_fileType)
      }
    }
  } catch (e) {
    console.error(`Error creating fileTypes\n ${e}`)
  }
}
