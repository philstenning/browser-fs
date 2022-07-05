/* eslint-disable no-await-in-loop */
import { fsaDirectory } from '../types'
import { db } from '@db/setup'

export default async function mergeToParentDirectory(
  directory: fsaDirectory,
  toRoot: boolean = false
) {
  // we have current dir  from props
  try {
    let useThisDir = false
    let parentDir: fsaDirectory | undefined
    while (!useThisDir) {
      // if we want to merge to root we get it here.
      if (toRoot) {
        parentDir = await db.directories.get(directory.rootId)
      } else {
        // or get parent dir
        // eslint-disable-next-line no-lonely-if
        if (directory.parentId) {
          parentDir = await db.directories.get(directory?.parentId)
        }
      }
      if (!parentDir) return false

      // check if it is hidden if it is get it's parent recursive
      // if we have got to root then exit also.
      if (parentDir.hidden === 'false' || parentDir.isRoot) {
        useThisDir = true
      }
    }
    if (!parentDir) return false

    // get files for current dir
    const files = await db.files.bulkGet(directory.fileIds)

    // change the parent id to the new parent id // leave initParent as set.
    await db.transaction('rw', db.directories, db.files, async () => {
      for (const f of files) {
        if (!f || !parentDir) break

        f.parentId = parentDir.id
        await db.files.put(f)
        //  filesToUpdate.push(f)
        // we need these later, so store them
        const ids = directory.fileIds

        // remove file ids from old parent dir and update it.
        await db.directories.put({ ...directory, fileCount: 0, fileIds: [] })
        // dirsToUpdate.push(directory)
        // add file ids to new parent dir
        parentDir.fileIds = [...parentDir.fileIds, ...ids]
        parentDir.fileCount = parentDir.fileIds.length

        await db.directories.put(parentDir)
      }
    })
  } catch (err) {
    console.error(`error merging directory to parent ${directory.name} ${err}`)
  }
  return false
}
