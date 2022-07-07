import { fsaFile } from "../types";
import { db } from '../../db/setup'

export default async function saveFile(file: fsaFile) {
  try {
    const id = await db.files.put(file);
    file.id = id;
    return file;
  } catch (e) {
    console.log(`Error Saving file: ${file.name} in database: ${e} `);
    return null;
  }
}
