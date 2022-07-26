import { fsaFile } from "../types";
import { db } from '../../db/setup'

/**
 * Saves or updates the file if it already exists in the database, 
 * the original file is overwritten.
 * @param file 
 * @category Files
 * @returns 
 */
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
