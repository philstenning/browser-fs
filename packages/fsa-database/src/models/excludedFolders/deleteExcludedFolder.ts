import { db, fsaExcludedFolder } from "../..";

export async function deleteExcludedFolderName(id: number) {
  try {
     await db.excludedFolders.delete(id)
  } catch (error) {
    console.error(`Error deleting excluded folderName with id:${id} ${error}`);
  }
}
