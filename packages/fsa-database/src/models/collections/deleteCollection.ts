import { db } from "../../db/setup";
import { fsaCollection } from "../types";
import { removeFileFromCollection } from "./removeFileFromCollection";
/**
 * Remove the id from the files.userCollections prop
 * then remove collection from database.
 * @param collection
 * @returns
 */
export async function deleteCollection(collection: fsaCollection) {
  if (!collection.id) return false;
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
