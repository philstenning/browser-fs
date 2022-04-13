import { db } from "../../db/setup";
import { fsaFile } from "../types";

export async function deleteFile(file: fsaFile) {
  try {
    await db.files.delete(file.id);
    console.log("TODO remove from User collections");
    return true;
  } catch (e) {
    console.log(`Error deleting file: ${file.name} from database: ${e} `);
    return false;
  }
}
