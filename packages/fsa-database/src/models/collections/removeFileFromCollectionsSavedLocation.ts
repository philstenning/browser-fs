import { db } from "../../db/setup";
import { fsaCollection, fsaFile } from "../types";
import { checkPermissionsOfHandle } from "fsa-browser";

export async function removeFileFromCollectionsSavedLocation(
  file: fsaFile,
  collection: fsaCollection
) {
  if (!collection.handle) return;
  const { handle, name } = collection;
  // check user settings if we need to remove file
  const settings = await db.settings.toCollection().last();
  if (!settings) return;
  const { cleanFilesFromCollections } = settings;
  if (!cleanFilesFromCollections) return;

  console.log({ handle });
  if (!(await checkPermissionsOfHandle(handle, "readwrite"))) return;
  try {
      // const dirHandle = await handle.getDirectoryHandle(name);
      await handle.removeEntry(file.name);
  } catch (e) {
    console.warn(`unable to remove file from local drive it probably did not exist, 
    directory: ${handle.name} 
    file: ${file.name} 
    message: ${e}`);
  }
}
