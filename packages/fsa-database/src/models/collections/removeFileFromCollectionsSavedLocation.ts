import { db } from "../../db/setup";
import { fsaCollection, fsaFile } from "../types";
import { checkPermissionsOfHandle } from "fsa-browser";

export async function removeFileFromCollectionsSavedLocation(
  file: fsaFile,
  collection: fsaCollection
) {
  if (!collection.handle) return;
  const { handle,files } = collection;
  // check user settings if we need to remove file from fs
  const settings = await db.settings.toCollection().last();
  if (!settings) return;
  const { cleanUpFiles } = settings;
  if (!cleanUpFiles) return;

  console.log({ handle });
  if (!(await checkPermissionsOfHandle(handle, "readwrite"))) return;
  try {
      // const dirHandle = await handle.getDirectoryHandle(name);
      const fileName = files.filter(f=>f.fileId === file.id)[0].name
      await handle.removeEntry(fileName);
  } catch (e) {
    console.warn(`unable to remove file from local drive it probably did not exist, 
    directory: ${handle.name} 
    file: ${file.name} 
    message: ${e}`);
  }
}
