import { fsaDirectory } from "../types";
import { deleteRootFolderFiles } from "../files";
import { db } from "../../db/setup";

export async function deleteRootDbDirectoryAndFiles(dir: fsaDirectory) {
  if (!dir.id) return false;
  try {
    const hasDeletedFiles = await deleteRootFolderFiles(dir.id);
    if (hasDeletedFiles) {
      await db.directories.where("rootId").equals(dir.id).delete();
      return true;
    }
  } catch (error) {
    console.log(
      `Error deleting root folder :${dir.name} from database: ${error} `
    );
    return false;
  }
  return false;
}
