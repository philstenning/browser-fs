import { db, setCurrentRootDirectoryId, setCurrentDirectoryId } from '../'
import { fsaDirectory } from '../models/types'

import getDragDirectoryById from './getDragDirectoryById'
import createDragFile from './createDragFile'
import getDragDirectoryByName from './getDragDirectoryByName'

export default async function dragAddFilesToDirectory(
  files: File[],
  name: string,
  dirId?: string
) {
  // browsers that do not support file system access api
  // firefox etc.
  // dragAddFilesToDirectoryLegacy()

  // find or create the directory for new files.
  let directory: fsaDirectory | false = false
  if (dirId) {
    // dirId takes president over name.
    directory = await getDragDirectoryById(dirId)
  } else if (name) {
    directory = await getDragDirectoryByName(name)
  }
  if (!directory) return 

  //  fileIds will be added to the directory.fileIds
  // retrieve the current values
  const { fileIds, id } = directory
  for (const file of files) {
    const maybeFileId = await createDragFile(id, file)
    if (maybeFileId) fileIds.push(maybeFileId)
  }
  // now update the directory with the count and fieldIds
  const updatedDir: fsaDirectory = {
    ...directory,
    fileIds,
    fileCount: fileIds.length,
  }
  try {
    await db.directories.put(updatedDir)
    await setCurrentDirectoryId(directory.id)
    await setCurrentRootDirectoryId(directory.id)
  } catch (error) {
    console.error(`Error updating Directory: ${directory.name}`)
  }
}


