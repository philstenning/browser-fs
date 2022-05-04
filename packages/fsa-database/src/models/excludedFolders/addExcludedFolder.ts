import { db, fsaExcludedFolder } from "../../";

export async function addExcludedFolderName(name: string) {
  name = name.trim();
  try {
    const hasName = await db.excludedFolders.where({ name }).count();
    if (!!hasName) return; // already in db

    const id = await db.excludedFolders.add({ name });

    const excludedFolder: fsaExcludedFolder = { name, id };
    return excludedFolder;
  } catch (error) {
    console.error(`Error adding excludedFolder name:${name} ${error}`);
  }
}
