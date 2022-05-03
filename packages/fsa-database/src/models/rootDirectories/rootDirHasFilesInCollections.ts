import { db } from "../../db/setup";

export async function rootDirHasFilesInCollections(
  rootId: string
): Promise<boolean> {
  // get its files
  const files = await db.files.where("rootId").equals(rootId).toArray();

  let result = false;
  for (const file of files) {
    if (file.userCollectionIds.length > 0) {
      result = true;
      break;
    }
  }
  return result;
}
