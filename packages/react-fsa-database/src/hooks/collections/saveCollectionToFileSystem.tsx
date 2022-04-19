import { db, fsaFile } from "fsa-database";
import { checkPermissionsOfHandle } from "fsa-browser";
export async function saveCollectionToFileSystem(collectionId: string) {
  const collection = await getCollectionsSavedLocationHandle(collectionId);
  if (!collection || !collection.handle) return false;

  //check dir has write permission
  const hasPermission = await checkPermissionsOfHandle(
    collection.handle,
    "readwrite"
  );

  if (!hasPermission) return false;

  // get all files from db
  const files = await db.files.bulkGet(collection.files.map((f) => f.fileId));

  await getRootIdPermissions([...files]);

  // save a copy to folder you got the handle for
  for (const file of files) {
    if (file) {
      // if we don't have permission it will fail
      // without warning you. so check for it.

      try {
        const f = await file.handle.getFile();
        // create new file handle for the directory
        const newFileHandel = await collection.handle.getFileHandle(f.name, {
          create: true,
        });
        const writable = await newFileHandel.createWritable();
        // copy file to new file location.
        await writable.write(f);
        await writable.close();
      } catch (e) {
        console.error(
          `error copping file to collection folder ${file.name} collection:${collection.name} `,
          e
        );
      }
    }
  }
}

async function getRootIdPermissions(files: (fsaFile | undefined)[]) {
  // use a set to get unique list or ids
  const ids = new Set<string>();
  files.forEach((f) => {
    if (f) ids.add(f.rootId);
  });

  for (const id of ids) {
    const rootDir = await db.directories.get(id);
    if (rootDir) {
      console.log(
        `checking the root dir permission ${rootDir.name}  id: ${rootDir.id}`
      );
      await checkPermissionsOfHandle(rootDir?.handle);
    }
  }
}


/**
 * TODO from ;here...
 * at the moment if the root dir has been 
 * deleted  you get an error that you can't do 
 * anything about.
 * you need to check the dir exists first befor saving data
 * to it or you will get this error
 * TODO save the parent directory handle as well
 * collection.handle = await handle.getDirectoryHandle(collection.name, {
 *     create: true,
 *   });
 *   use  with options then it will create if not exists.
 */


async function getCollectionsSavedLocationHandle(collectionId: string) {
  // get collection from db
  const collection = await db.userCollections.get(collectionId);
console.log('ffff')
  try {
    await collection?.handle?.values();
  } catch (e) {
    console.error(`oh no not heree`, e);
  }

  if (!collection) return null;

  // do we have a dir handle set if not get one
  if (!collection.handle) {
    //assign it the new handle or overwrite it
    const handle = await window.showDirectoryPicker({
      //   startIn: "pictures",
    });
    // create folder for collection if it exists delete content first
    collection.handle = await handle.getDirectoryHandle(collection.name, {
      create: true,
    });
    // save in db
    try {
      await db.userCollections.put(collection);
      return collection;
    } catch (e) {
      console.error(`error saving userCollection ${collection.name}  ${e}`);
    }
  }

  return collection;
}
