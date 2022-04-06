import { db } from "../setup";
import { fsaFile } from "./types";

export function createFile(
  handle: FileSystemFileHandle,
  parentId: number,
  rootId: number,
  path: string,
  type: string,
  name: string = handle.name,
  creator = "UserId",
  printed: boolean = false,
  tags: string[],
  description: string = "",
  imageUrl: string = "",
  userCollectionIds:number[]=[]
) {
  const createdAt = Date.now();
  const file: fsaFile = {
      name,
      handle,
      rootId,
      type,
      path,
      creator,
      parentId,
      printed,
      tags,
      description,
      created: createdAt,
      updated: createdAt,
      imageUrl,
      userCollectionIds,
  };

  return file;
}
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
export async function saveFiles(files: fsaFile[]) {
  try {
    const result = await db.files.bulkAdd(files, { allKeys: true });
    if (result.length === files.length) return true;
  } catch (e) {
    console.log(`Error Saving files: in database: ${e} `);
  }
}

export async function updateFile(file: fsaFile) {
  try {
    const res = await db.files.put(file, file.id);
    return res === file.id ? true : false;
  } catch (e) {
    console.log(`Error updating file: ${file.name} in database: ${e} `);
    return false;
  }
}

export async function deleteRootFolderFiles(rootId: number) {
  try {
    console.log("TODO remove from User collections");
    await db.files.where("rootId").equals(rootId).delete();
    return true;
  } catch (e) {
    console.log(
      `Error deleting files with rootId of:${rootId} from database: ${e} `
    );
    return false;
  }
}

export async function deleteFile(file: fsaFile) {
  if (!file.id) return false;
  try {
    await db.files.delete(file.id);
    console.log("TODO remove from User collections");
    return true;
  } catch (e) {
    console.log(`Error deleting file: ${file.name} from database: ${e} `);
    return false;
  }
}
export async function deleteFiles(files: fsaFile[]) {
  const ids = files.map((f) => f.id)

  if(!!ids)return false
  try {
    await db.files.bulkDelete(ids);
    console.log("TODO remove from User collections");
    return true;
  } catch (e) {
    console.log(`Error deleting files in database: ${e} `, { files });
    return false;
  }
}
