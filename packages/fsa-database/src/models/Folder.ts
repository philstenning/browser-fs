import { fsaDirectory } from "./types";
import {deleteRootFolderFiles} from './file'
import { db } from "../setup";

export async function createRootDbDirectory(
  handle: FileSystemDirectoryHandle,
  creator:string='user'
): Promise<fsaDirectory | null> {
  const directory = createDirectory(handle, "/", true, 0,[],0,creator);

  const test = await directoryAlreadyExists(directory);

  if (!test) {
    console.error(
      `A root directory with name: "${directory.name}" already exits in db.`
    );
    return null;
  }

  try {
    const id = await db.directories.add(directory);
    directory.id = id;
    directory.rootId = id;
    await db.directories.put(directory);

    console.log({ directory });
    return directory;
  } catch (e) {
    console.error("error creating root directory db entry");
    return null;
  }
}

async function directoryAlreadyExists(dir: fsaDirectory) {
  const dirs = await db.directories.where({isRoot:'true',name:dir.name}).count()
  if (dirs === 0) return true;
  return false;
}

export function createDirectory(
  handle: FileSystemDirectoryHandle,
  path: string,
  isRoot: boolean,
  rootId: number,
  fileIds = [],
  depth = 0,
  creator = 'user'
) {
  const createdAt = Date.now();
  const directory: fsaDirectory = {
    created: createdAt,
    updated: createdAt,
    depth,
    handle,
    path,
    rootId,
    isRoot: isRoot ? "true" : "false",
    label: "",
    name: handle.name,
    creator,
    fileIds,
    fileCount:0,
    hidden: "false",
  };
  return directory;
}

export async function deleteRootDbDirectoryAndFiles(dir:fsaDirectory) {
  if(!dir.id) return false
  try {
    const hasDeletedFiles = await deleteRootFolderFiles(dir.id)
    if(hasDeletedFiles){

      await db.directories.where("rootId").equals(dir.id).delete();
      return true
    }
  } catch (error) {
       console.log(
         `Error deleting root folder :${dir.name} from database: ${error} `
       );
       return false;
  }
  return false;
}