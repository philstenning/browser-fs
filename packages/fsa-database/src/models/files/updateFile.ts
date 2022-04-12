import { db } from "../../db/setup";
import { fsaFile } from "../types";

export async function updateFile(file: fsaFile) {
  try {
    const res = await db.files.put(file, file.id);
    return res === file.id ? true : false;
  } catch (e) {
    console.log(`Error updating file: ${file.name} in database: ${e} `);
    return false;
  }
}