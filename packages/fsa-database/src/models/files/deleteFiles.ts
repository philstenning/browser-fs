import { db } from "../../db/setup";
import { fsaFile } from "../types";



export async function deleteFiles(files: fsaFile[]) {
  const ids = files.map((f) => f.id);

  if (!!ids) return false;
  try {
    await db.files.bulkDelete(ids);
    console.log("TODO remove from User collections");
    return true;
  } catch (e) {
    console.log(`Error deleting files in database: ${e} `, { files });
    return false;
  }
}
