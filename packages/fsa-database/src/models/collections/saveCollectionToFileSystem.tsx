import { db } from '../../db/setup'
import { fsaCollection, fsaFile } from '../types'
import { checkPermissionsOfHandle } from 'fsa-browser'
import updatePermissionsForRootDirAndChildren from './updatePermissionsForRootDirAndChildren'

export default async function saveCollectionToFileSystem(collectionId: string) {
  const collection = await getCollectionsSavedLocationHandle(collectionId)
  if (!collection || !collection.handle) return false

  // get all files from db
  let files = await db.files.bulkGet(collection.files.map((f) => f.fileId))
  //temporarily map collections.names to file.names
  // just for saving files
  const mappedFiles = mapCollectionNameToFileName(files, collection)

  mappedFiles.forEach((f) => console.log(f?.name))

  await getRootIdPermissions([...mappedFiles])

  // save a copy to folder you got the handle for
  for (const file of mappedFiles) {
    if (file) {
      // if we don't have permission it will fail
      // without warning you. so check for it.

      try {
        const f = await file.handle.getFile()
        // create new file handle for the directory
        const newFileHandel = await collection.handle.getFileHandle(file.name, {
          create: true
        })
        const writable = await newFileHandel.createWritable()
        // copy file to new file location.
        await writable.write(f)
        await writable.close()
      } catch (e) {
        console.error(
          `error copping file to collection folder ${file.name} collection:${collection.name} `,
          e
        )
      }
    }
  }
}

export function mapCollectionNameToFileName(
  files: (fsaFile | undefined)[],
  collection: fsaCollection
) {
  return files.map((file) => {
    if (file) {
      file.name = collection.files.filter((f) => f.fileId === file.id)[0].name
      return file
    }
  })
}

/**
 * checks and/or gets the permissions for the
 * root directories from the files array
 * @param {fsaFile[]} files
 */
async function getRootIdPermissions(files: (fsaFile | undefined)[]) {
  // use a set to get unique list or ids
  const ids = new Set<string>()
  files.forEach((f) => {
    if (f) ids.add(f.rootId)
  })

  for (const id of ids) {
    const rootDir = await db.directories.get(id)
    if (rootDir) {
      console.log(
        `checking the root dir permission ${rootDir.name}  id: ${rootDir.id}`
      )
      const hasPermission = await checkPermissionsOfHandle(rootDir?.handle)
      updatePermissionsForRootDirAndChildren(rootDir.id, true)
    }
  }
}

/**
 *
 */
async function getCollectionsSavedLocationHandle(collectionId: string) {
  // get collection from db
  const collection = await db.userCollections.get(collectionId)
  if (!collection) return null

  // do we have parent handle? if not get one
  await getCollectionParentHandle(collection)
  if (!collection.parentHandle) return null

  if (!(await checkForCollectionDirectoryHandle(collection))) return null

  try {
    // save in db
    await db.userCollections.put(collection)
    return collection
  } catch (e) {
    console.error(`error saving userCollection ${collection.name}  ${e}`)
    return null
  }
}

async function checkForCollectionDirectoryHandle(collection: fsaCollection) {
  const { parentHandle } = collection
  if (!parentHandle) return false
  // we need permissions on the parent handle
  //check dir has write permission
  const hasPermission = await checkPermissionsOfHandle(
    parentHandle,
    'readwrite'
  )

  if (!hasPermission) return false
  try {
    // get the handle or create if not exists.
    collection.handle = await parentHandle.getDirectoryHandle(collection.name, {
      create: true
    })
    return true
  } catch (e) {
    console.error(
      `error getting directory handle for ${collection.name} id: ${collection.id}: checkForCollectionDirectoryHandle()  ${e}`
    )
  }

  return false
}

async function getCollectionParentHandle(collection: fsaCollection) {
  if (!collection.parentHandle) {
    //assign it the new handle or overwrite it
    try {
      collection.parentHandle = await window.showDirectoryPicker()
    } catch (e) {
      console.error(
        `error getting parent directory handle: getCollectionParentHandle() ${e}`
      )
    }
  }
}
