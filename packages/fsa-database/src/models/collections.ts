import { db } from "../setup";
import { fsaCollection, fsaFile } from "./types";
// import {v4 as uuid} from 'uuid'

export async function createCollection(
  name: string,
  files: number[] = [],
  description = "",
  creator: string = "",
  tags: string[] = []
): Promise<fsaCollection | undefined> {
  const createdAt = Date.now();
  const collection: fsaCollection = {
    created: createdAt,
    updated: createdAt,
    name,
    creator,
    files,
    tags,
    description,
  };

  const id = await db.userCollections.add(collection);
  return await db.userCollections.get(id);
}


/**
 * sdfalksjdf;lkasjdf
 * @param collection 
 * @param file 
 * @returns sdfalsdfsdfsdf
 */
export async function addFileToCollection(
  collection: fsaCollection,
  file: fsaFile
) {
  // is file already in collection return
  if (!file.id || !collection.id) return;
  if (collection.files.includes(file.id)) return false;
  collection.files.push(file.id);
  file.userCollectionIds.push(collection.id);
  return await putCollectionAndFile(collection, file);
}

export async function removeFileFromCollection(
  collection: fsaCollection,
  file: fsaFile
  
) {
  // if file is not in collection return
   if (!file.id || !collection.id) return;
  if (!collection.files.includes(file.id)) return false;
  const fileIds = file.userCollectionIds.filter((f) => f !== collection.id);
  const colIds = collection.files.filter((f) => f !== file.id);
  collection.files = colIds;
  file.userCollectionIds = fileIds;
  return await putCollectionAndFile(collection, file);
}

async function putCollectionAndFile(collection: fsaCollection, file: fsaFile) {
  try {
    const updatedAt = Date.now();
    collection.updated = updatedAt;
    file.updated = updatedAt;
    await db.transaction("rw", db.userCollections, db.files, async () => {
      await db.userCollections.put(collection);
      await db.files.put(file);
    });
    return true;
  } catch (err) {
    console.error(
      `error updating file  ${file.name} or collection ${collection.name} ${err}`
    );
    return false;
  }
}
/**
 * check if there are any differences between the old and new
 * files array and add/remove them as needed. then save the result.
 * @param collection
 * @returns
 */
export async function updateCollection(collection: fsaCollection) {
  //get old collection.
  if (!collection.id) return;
  const oldCollection = await db.userCollections.get(collection.id);
  if (!oldCollection) return;
  const itemsToAdd: number[] = [];
  const itemsToDel: number[] = [];
  // the items are in the new one
  // but not in the old so need to
  //be added.
  collection.files.forEach((n) => {
    if (oldCollection.files.includes(n)) {
      itemsToAdd.push(n);
    }
  });
  // the items are in the old one
  // but have been removed, so we
  // need to remove them.
  oldCollection.files.forEach((n) => {
    if (collection.files.includes(n)) itemsToDel.push(n);
  });

  for (const id of itemsToAdd) {
    const _file = await db.files.get(id);
    if (_file) {
      const res = await addFileToCollection(collection, _file);
      if (res) collection.files = [...collection.files, id];
    }
  }

  for (const id of itemsToDel) {
    const _file = await db.files.get(id);
    if (_file) {
      const res = await removeFileFromCollection(collection, _file);
      if (res) collection.files = [...collection.files.filter((n) => n !== id)];
    }
  }

  // if any other changes lets save again
  collection.updated = Date.now();
  const id = await db.userCollections.put(collection);
  if (id === collection.id) return true;
  return false;
}

/**
 * Remove the id from the files.userCollections prop
 * then remove collection from database.
 * @param collection
 * @returns
 */
export async function deleteCollection(collection: fsaCollection) {
   if (!collection.id) return false
  for (const fileId of collection.files) {
    const file = await db.files.get(fileId);
    if (!file) return;
    if (file.id === fileId) {
      await removeFileFromCollection(collection, file);
      return true;
    }
  }
  await db.userCollections.delete(collection.id);
  return false;
  // update/save files
  // delete this collection.
}
