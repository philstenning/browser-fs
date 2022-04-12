import {
  db,
  fsaCollection,
  useLiveQuery,
  createCollection,
  deleteCollection,
  addFileToCollection as fsaAddFileToCollection,
  removeFileFromCollection as fsaRemoveFileFromCollection,
  updateCollection as fsaUpdateCollection,
  removeAllFilesFromCollection,
  fsaFile,
  DbError,
} from "fsa-database";
import { useFsaDbContext } from "../../context/dbContext";

const useCollections = () => {
  const collections = useLiveQuery(() => db.userCollections.toArray()) ?? [];
  const { setCurrentCollection, dbState } = useFsaDbContext();
  const addCollection = (
    name: string,
    files: number[] = [],
    description = "",
    creator: string = "",
    tags: string[] = []
  ) => {
    // if(name.length<1){
    //   return new DbError("Collection name can not be empty",'error');
    // }
    createCollection(name, files, description, creator, tags)
      .then((res) => {
        if (res) {
          setCurrentCollection(res);
          return true;
        }
      })
      .catch((err) => new DbError("Creating Collection", "error", err));
  };

  const removeCollection = (collection: fsaCollection) => {
    deleteCollection(collection).then((res) => res);
  };

  const addFileToCollection = (file: fsaFile, collection?: fsaCollection) => {
    fsaAddFileToCollection(file, collection).then((res) => res);
    // set the passed collection to the current collection if it isn't already.
    if (collection && dbState.currentCollection !== collection.id)
      setCurrentCollection(collection);
  };

  const removeFileFromCollection = (
    file: fsaFile,
    collection?: fsaCollection
  ) => {
    console.log({ file });
    // if we don't have a collection
    // we assume we want to remove it from
    // the current selected collection
    if (!collection) {
      console.log("removeFileFromCollection: no collection");
      getCurrentCollection().then((_collection) => {
        if (_collection) {
          const l = _collection.files;
          const m = file.userCollectionIds;
          console.log(l, m, "id:", _collection.id);
          fsaRemoveFileFromCollection(_collection, file);
        }
      });
      return;
    }

    console.log("removeFileFromCollection: has collection");
    fsaRemoveFileFromCollection(collection, file).then((res) => res);
  };
  const updateCollection = (collection: fsaCollection) => {
    fsaUpdateCollection(collection).then((res) => res);
  };

  const currentCollectionItems = getItems();

  return {
    collections,
    addCollection,
    removeCollection,
    addFileToCollection,
    removeFileFromCollection,
    updateCollection,
    currentCollectionItems,
    removeAllFilesFromCollection,
  };
};

async function getCurrentState() {
  return (await db.state.toCollection().last()) ?? null;
}

async function getCurrentCollection() {
  const state = await getCurrentState();
  const collection = await db.userCollections.get(
    state?.currentCollection ?? 0
  );
  if (collection) return collection;
  return null;
}

function getItems() {
  const list = useLiveQuery(async () => {
    const state = await db.state.toCollection().last();
    const collection = await db.userCollections.get(
      state?.currentCollection ?? 0
    );
    if (collection) {
      return (
        (await db.files.where("id").anyOf(collection.files).toArray()) ?? []
      );
    }
    return [];
  });
  return list ?? [];
}

export { useCollections };
