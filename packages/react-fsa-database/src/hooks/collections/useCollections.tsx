import {
  db,
  fsaCollection,
  useLiveQuery,
  createCollection,
  deleteCollection,
  addFileToCollection as fsaAddFileToCollection,
  removeFileFromCollection as fsaRemoveFileFromCollection,
  updateCollection,
  removeAllFilesFromCollection,
  fsaFile,
  fsaCollectionFile,
  saveCollectionToFileSystem,
} from "fsa-database";
import { useFsaDbContext } from "../../context/dbContext";

const useCollections = () => {
  const collections =
    useLiveQuery(() =>
      db.userCollections.orderBy("created").reverse().toArray()
    ) ?? [];
  const { setCurrentCollectionId, dbState } = useFsaDbContext();

  const addCollection = async (
    name: string,
    files: fsaCollectionFile[] = [],
    description = "",
    creator: string = "",
    tags: string[] = []
  ) => {
    const res = await createCollection(name, files, description, creator, tags);
    if (res) {
      setCurrentCollectionId(res.id);
      return true;
    }
  };

  const removeCollection = async (collection: fsaCollection) => {
    const res = await deleteCollection(collection);
    if (!res) return;
    // if we only have one left set it as current.
    const count = await db.userCollections.count();
    if (count === 1) {
      const col = await db.userCollections.toCollection().first();
      if (col) setCurrentCollectionId(col.id);
      // If there is none left
    } else if (count === 0) {
      setCurrentCollectionId(null);
    }
  };

  const addFileToCollection = async (
    file: fsaFile,
    collection?: fsaCollection
  ) => {
    const added = await fsaAddFileToCollection(file, collection);
    if (!added) return;
    // set the passed collection to the current collection if it isn't already.
    if (collection && dbState.currentCollectionId !== collection.id)
      setCurrentCollectionId(collection.id);
  };

  const removeFileFromCollection = async (
    file: fsaFile,
    collection?: fsaCollection
  ) => {
    // if we don't have a collection
    // we assume we want to remove it from
    // the current selected collection
    if (!collection) {
      const _collection = await getCurrentCollection();
      if (_collection) {
        await fsaRemoveFileFromCollection(_collection, file);
      }
      return;
    }
    await fsaRemoveFileFromCollection(collection, file);
  };

  const currentCollectionItems = getItems();

  const cloneCollection = async (
    collection: fsaCollection,
    name: string = "copy"
  ) => {
    if (name === "copy") name = `${collection.name}_copy`;
    const { files, description, creator, tags } = collection;
    const clone =
      (await createCollection(name, files, description, creator, tags)) ?? null;
    if (!clone) return false;
    setCurrentCollectionId(clone.id);
    return clone;
  };

  return {
    collections,
    addCollection,
    removeCollection,
    addFileToCollection,
    removeFileFromCollection,
    updateCollection,
    currentCollectionItems,
    cloneCollection,
    removeAllFilesFromCollection,
    saveCollectionToFileSystem,
  };
};

async function getCurrentState() {
  return (await db.state.toCollection().last()) ?? null;
}

async function getCurrentCollection() {
  const state = await getCurrentState();
  if (!state?.currentCollectionId) return;
  const collection = await db.userCollections.get(state?.currentCollectionId);
  if (!collection) return null;
  return collection;
}
/**
 * get the items/files of the currently selected collection
 * @returns
 */
function getItems() {
  const list = useLiveQuery(async () => {
    // get state
    const state = await db.state.toCollection().last();
    if (!state?.currentCollectionId) return;
    // get current collection
    const collection = await db.userCollections.get(state?.currentCollectionId);
    if (collection) {
      // get the files
      const files =
        (await db.files
          .where("id")
          .anyOf(collection.files.map((f) => f.fileId))
          .toArray()) ?? [];

      // add order from the collection.
      files.forEach((f) => {
        const match = collection.files.filter((c) => c.fileId === f.id)[0];
        f.order = match.order ?? 0
        f.name= match.name
       
      });
      // sort asc order
      return files.sort((a, b) => a.order - b.order);
    }
    return [];
  });
  return list ?? [];
}

export { useCollections };
