import { fsaDirectory } from "../types";
import { db } from "../../db/setup";
import {createDirectory} from './createDirectory'
export async function createRootDbDirectory(
  handle: FileSystemDirectoryHandle,
  creator: string = "user"
): Promise<fsaDirectory | null> {
  const directory = createDirectory(handle, "/", true, 0, [], 0, creator);

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
  const dirs = await db.directories
    .where({ isRoot: "true", name: dir.name })
    .count();
  if (dirs === 0) return true;
  return false;
}
