import { db } from "../../db/setup";
import { fsaCollection } from "../types";

/**
 * Just updates data, Do not change the files with this function,
 * it will not add/remove them for you, use the removeFileFromCollection()
 * addFileToCollection() instead.
 * @param collection
 * @returns
 */
export default async function updateCollection(collection: fsaCollection) {
  // if any other changes lets save again
  collection.updated = Date.now();
  try{

    const id = await db.userCollections.put(collection);
    if (id === collection.id) return true;
  }catch(error){
    console.error(`Error updating User Collection ${error}`)
  }
  return false;
}
