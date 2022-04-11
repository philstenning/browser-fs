import { db } from "../../db/setup";
import { fsaCollection, fsaFile } from "../types";

export async function putCollectionAndFile(collection: fsaCollection, file: fsaFile) {
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
