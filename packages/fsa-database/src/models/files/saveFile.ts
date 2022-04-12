import { db } from "../../db/setup";
import { fsaFile } from "../types";

export async function saveFile(file: fsaFile) {
  try {
    const id = await db.files.add(file);
    file.id = id;
    return file;
  } catch (e) {
    console.log(`Error Saving file: ${file.name} in database: ${e} `);
    return null;
  }
}
