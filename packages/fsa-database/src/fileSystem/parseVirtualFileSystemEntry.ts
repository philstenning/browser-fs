import type { VirtualFileSystemEntry } from '@philstenning/fsa-browser'
import createDirectory from '../models/directories/createDirectory'
import { fsaDirectory } from '../models/types'
import { db } from '../db/setup'
import { saveFile, createFile } from '../models/files'
/**
 * When passed a valid  virtualFileSystemEntry object from fsa-browser's
 * scanLocalDrive() function
 * we convert it into folders and files and save to the database.
 * The assumption is the data has been validated in the scanLocalDrive function and
 * should be valid and have permissions.
 * 
 * @category Local File System
 * @param virtualFileSystemEntry
 * @returns true if complected successfully, false if not.
 */
export default async function parseVirtualFileSystemEntry(
  virtualFileSystemEntry: VirtualFileSystemEntry,
  rootId: string,
  parentId: string
) {
  if (!virtualFileSystemEntry.entries) return false

  const dirs: fsaDirectory[] = []

  const fileIds: string[] = []

  //iterate over each entries handle
  // virtualFileSystemEntry.entries.forEach(async (entry) => {

  for (const entry of virtualFileSystemEntry.entries) {
    const { handle, path, depth } = entry

    if (handle.kind === 'directory') {
      // convert to fsaDirectory object
      const directory = createDirectory(
        handle,
        path ?? '',
        false,
        rootId,
        parentId,
        [],
        depth,
        'user',
        'true'
      )
      dirs.push(directory)

      // set props for ui
      // if( rootId){
      //   directory.isScanning=true
      //   directory.scanFinished=false
      // }
      const id = await db.directories.add(directory)

      // !!!important - recursively scan each directory
      await parseVirtualFileSystemEntry(entry, rootId, id)
    } else {
      // convert to fsaFile object
      // console.log(`${entry.name} ${entry.extension}`)
      const file = await createFile(
        handle,
        parentId,
        rootId,
        entry.path || '',
        entry.extension,
        entry.name,
        'userId',
        false,
        []
      )

      const dbFile = await saveFile(file)
      if (dbFile?.id) fileIds.push(dbFile.id)
    }
  }

  await updateParentDirectory(fileIds, parentId)

  return true
}

// update the current fsaDirectory object parts property
//  only if we have files to add.
async function updateParentDirectory(fileIds: string[], parentId: string) {
  if (fileIds.length > 0) {
    const parentDir = await db.directories.get(parentId)
    // .where(":id")
    // .equals(parentId)

    if (!parentDir) {
      console.error('No directory in db with that id. updateParentDirectory() ')
      return
    }
    parentDir.fileIds = fileIds
    parentDir.fileCount = fileIds.length
    // update item in db with a put
    await db.directories.put(parentDir)
  }
}
