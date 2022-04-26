import { fsaDirectory } from "../types";
import { db } from "../../db/setup";
import { createDirectory } from "../directories/createDirectory";
export async function createRootDirectory(
  handle: FileSystemDirectoryHandle,
  creator: string = "user"
): Promise<fsaDirectory | null> {
  const directory = createDirectory(
    handle,
    "/",
    true,
    "",
    null,
    [],
    0,
    creator,
    "true"
  );
  // console.log({ directory });
  const test = await directoryAlreadyExists(directory);

  if (!test) {
    console.error(
      `A root directory with name: "${directory.name}" already exits in db.`
    );
    return null;
  }

  try {
    
    directory.rootId = directory.id;
    

    await db.directories.add(directory);
    // directory.id = id;
    // await db.directories.put(directory);

    // console.log({ directory });
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
