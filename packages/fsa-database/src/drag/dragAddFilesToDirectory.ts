import setCurrentRootDirectoryId from '../models/state/setCurrentRootDirectoryId'
import { db } from '../db/setup'
import { fsaDirectory, fsaFile } from '../models/types'
import setCurrentDirectoryId from '../models/state/setCurrentDirectoryId'
import getDragDirectoryById from './getDragDirectoryById'
import createDragFile from './createDragFile'
import getDragDirectoryByName from './getDragDirectoryByName'
import createDragDirectory from './createDragDirectory'
import { getCurrentSetting } from '../models/settings'

export default async function dragAddFilesToDirectory(
  files: File[],
  name: string,
  dirId?: string
) {
  // only proceed if allowDndFiles is true
  if (!(await getCurrentSetting()).allowDndFiles) return

  // find  existing or create the directory for new files.
  let directory: fsaDirectory | false = false
  if (dirId) {
    // dirId takes president over name.
    directory = await getDragDirectoryById(dirId)
  } else if (name) {
    directory = await getDragDirectoryByName(name)
  } else {
    // no default directory exists so create a new one.
  }
  if (!directory) {
    const res = await createDragDirectory(name, '/', true)
    if (res) {
      directory = res
    } else {
      return
    }
  }

  //  fileIds will be added to the directory.fileIds
  // retrieve the current values
  const { fileIds, id } = directory
  const createdFiles: fsaFile[] = []
  for (const file of files) {
    // TODO create array add bulk
    const maybeFile = await createDragFile(id, id, file)
    if (maybeFile) {
      fileIds.push(maybeFile.id)
      createdFiles.push(maybeFile)
    }
  }
  // now update the directory with the count and fieldIds
  const updatedDir: fsaDirectory = {
    ...directory,
    fileIds,
    fileCount: fileIds.length,
  }
  try {
    db.transaction('rw', db.directories, db.files, () => {
      // use put as it might exist already
      db.directories.put(updatedDir)
      db.files.bulkAdd(createdFiles)
    })

    await setCurrentDirectoryId(directory.id)
    await setCurrentRootDirectoryId(directory.id)
  } catch (error) {
    console.error(`Error updating Directory with files: ${directory.name}`)
  }
}
