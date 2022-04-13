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
  fsaCollectionFile,
  DbError,
} from "fsa-database";
import { useFsaDbContext } from "../../context/dbContext";

const useCollections = () => {
  const collections =
    useLiveQuery(() =>
      db.userCollections.orderBy("created").reverse().toArray()
    ) ?? [];
  const { setCurrentCollectionId, dbState } = useFsaDbContext();

  const addCollection = (
    name: string,
    files: fsaCollectionFile[] = [],
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
          setCurrentCollectionId(res.id);
          return true;
        }
      })
      .catch((err) => new DbError("Creating Collection", "error", err));
  };

  const removeCollection = (collection: fsaCollection) => {
    deleteCollection(collection).then((res) => {
      // if we only have one left set it as current
      db.userCollections.count().then((count) => {
        if (count === 1) {
          db.userCollections
            .toCollection()
            .first()
            .then((col) => {
              if (col) setCurrentCollectionId(col.id);
            });
        }
      });
    });
  };

  const addFileToCollection = (file: fsaFile, collection?: fsaCollection) => {
    fsaAddFileToCollection(file, collection).then((res) => res);
    // set the passed collection to the current collection if it isn't already.
    if (collection && dbState.currentCollectionId !== collection.id)
      setCurrentCollectionId(collection.id);
  };

  const removeFileFromCollection = (
    file: fsaFile,
    collection?: fsaCollection
  ) => {
    // if we don't have a collection
    // we assume we want to remove it from
    // the current selected collection
    if (!collection) {
      // console.log("removeFileFromCollection: no collection");
      getCurrentCollection().then((_collection) => {
        if (_collection) {
          const l = _collection.files;
          const m = file.userCollectionIds;
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
  if (!state?.currentCollectionId) return;
  const collection = await db.userCollections.get(state?.currentCollectionId);
  if (!collection) return null;
  return collection;
}

function getItems() {
  const list = useLiveQuery(async () => {
    // get state
    const state = await db.state.toCollection().last();
    if (!state?.currentCollectionId) return;
    // get current collection
    const collection = await db.userCollections.get(
      state?.currentCollectionId
    );
    if (collection) {
      // get the files
      const files =
        (await db.files
          .where("id")
          .anyOf(collection.files.map((f) => f.fileId))
          .toArray()) ?? [];

      // add order from the collection.
      files.forEach((f) => {
        f.order =
          collection.files.filter((c) => c.fileId === f.id)[0].order ?? 0;
      });
      // sort asc order
      return files.sort((a, b) => a.order - b.order);
    }
    return [];
  });
  return list ?? [];
}

export { useCollections };
