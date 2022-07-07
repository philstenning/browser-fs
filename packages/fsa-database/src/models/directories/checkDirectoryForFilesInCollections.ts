import {  fsaDirectory } from "../types";
import { db } from '../../db/setup'

export default  async function checkDirectoryForFilesInCollections(dir: fsaDirectory) {
  let counter = 0;
  let hasCollections = false;
  await db.files
    .where("parentId")
    .equals(dir.id)
    .each((file) => {
      if (file.userCollectionIds.length > 0) {
        counter++;
        hasCollections = true;
      }
    });
    // console.log({hasCollections}, {counter})
  return { hasCollections, counter };
}
