import { db } from "../../db/setup";
import { fsaCollection,fsaCollectionFile } from "../types";
import {addFileToCollection} from './addFileToCollection'
import {removeFileFromCollection} from './removeFileFromCollection'

/**
 * Just updates data, Do not change the files with this function,
 * it will not add/remove them for you, use the removeFileFromCollection() 
 * addFileToCollection() instead.
 * @param collection
 * @returns
 */
export async function updateCollection(collection: fsaCollection) {
 


  // if any other changes lets save again
  collection.updated = Date.now();
  const id = await db.userCollections.put(collection);
  if (id === collection.id) return true;
  return false;
}
