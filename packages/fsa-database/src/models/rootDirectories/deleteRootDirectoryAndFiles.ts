import { fsaDirectory } from "../types";
import { deleteRootFolderFiles } from "../files";
import { db } from "../../db/setup";
import {selectPreviouslySelectedRootDir} from './selectPreviouslySelectedRootDir'


export async function deleteRootDirectoryAndFiles(dir: fsaDirectory) {
  if (!dir.id) return false;
  try {
    const hasDeletedFiles = await deleteRootFolderFiles(dir.id);
    if (hasDeletedFiles) {
      await db.directories.where("rootId").equals(dir.id).delete();
      await selectPreviouslySelectedRootDir();
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

