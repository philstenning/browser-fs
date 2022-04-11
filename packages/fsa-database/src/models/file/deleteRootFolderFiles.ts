import { db } from "../../db/setup";

export async function deleteRootFolderFiles(rootId: number) {
  try {
    console.log("TODO remove from User collections");
    await db.files.where("rootId").equals(rootId).delete();
    return true;
  } catch (e) {
    console.log(
      `Error deleting files with rootId of:${rootId} from database: ${e} `
    );
    return false;
  }
}
