import { db } from "../../db/setup";
import { fsaFile } from "../types";

export default async function updateFile(file: fsaFile) {
  try {
    const res = await db.files.put(file);
    return res === file.id ? true : false;
  } catch (e) {
    console.log(`Error updating file: ${file.name} in database: ${e} `);
    return false;
  }
}
