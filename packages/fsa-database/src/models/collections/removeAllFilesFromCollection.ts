import { db, getCurrentSetting } from "../../";
import { fsaCollection, fsaFile } from "../types";
import { mapCollectionNameToFileName } from "./saveCollectionToFileSystem";

export async function removeAllFilesFromCollection(collectionId: string) {
  const collection = await db.userCollections.get(collectionId);
  if (!collection) return;

  const files = await db.files.bulkGet(collection.files.map((f) => f.fileId));

  // check user settings if we need to remove file from fs
  const settings = await getCurrentSetting();

  if (collection.handle && collection.files.length && settings.cleanUpFiles) {
    await removeAllFileFromCollectionsSavedLocation(collection, files);
  }
  // remove collection id from each file
  // then put back in the db
  await db.transaction("rw", db.userCollections, db.files, async () => {
    try {
      for (const file of files) {
        if (!file) return;
        const fileIds = file.userCollectionIds.filter(
          (n) => n !== collection.id
        );
        file.userCollectionIds = fileIds;
        await db.files.put(file);
      }
      //
      collection.files = [];
      await db.userCollections.put(collection);
    } catch (err) {
      console.error("error removing files from collection.");
    }
  });
}

async function removeAllFileFromCollectionsSavedLocation(
  collection: fsaCollection,
  files: (fsaFile | undefined)[]
) {
  if (!collection.handle) return;
  // map the file names so we remove the correct file.
  const mappedFiles = mapCollectionNameToFileName(files, collection);
  for (const file of mappedFiles) {
    if (file) {
      try {
        await collection.handle.removeEntry(file.name);
      } catch (e) {
        console.warn(`unable to remove file from local drive it probably did not exist, 
         directory: ${collection.handle.name} 
         file: ${file.name} 
         message: ${e}`);
      }
    }
  }
}
