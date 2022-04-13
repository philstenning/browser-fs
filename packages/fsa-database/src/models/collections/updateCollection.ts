import { db } from "../../db/setup";
import { fsaCollection,fsaCollectionFile } from "../types";
import {addFileToCollection} from './addFileToCollection'
import {removeFileFromCollection} from './removeFileFromCollection'

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
  const itemsToAdd: fsaCollectionFile[] = [];
  const itemsToDel: fsaCollectionFile[] = [];
  // the items are in the new one
  // but not in the old so need to
  //be added.
  // TODO check if this still works
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
      const res = await addFileToCollection(_file, collection);
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
