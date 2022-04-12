import React from "react";
import {
  db,
  fsaCollection,
  useLiveQuery,
  createCollection,
  deleteCollection,
  addFileToCollection as fsaAddFileToCollection,
  removeFileFromCollection as fsaRemoveFileFromCollection,
  updateCollection as fsaUpdateCollection,
  fsaFile,
} from "fsa-database";

const useCollections = () => {
  const collections = useLiveQuery(() => db.userCollections.orderBy('id').toArray()) ?? [];

  const addCollection = (
    name: string,
    files: number[] = [],
    description = "",
    creator: string = "",
    tags: string[] = []
  ) => {
    createCollection(name, files, description, creator, tags).then((res) => {
      if (res) return true;
    });
    return false;
  };

  const removeCollection = (collection: fsaCollection) => {
    deleteCollection(collection).then((res) => res);
  };

  const addFileToCollection = (file: fsaFile, collection?: fsaCollection) => {
    fsaAddFileToCollection(file, collection).then((res) => res);
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
  };
};

async function getCurrentState() {
  return await db.state.toCollection().last() ?? null
  
}

async function getCurrentCollection() {
  const state =await getCurrentState()
  const collection = await db.userCollections.get(state?.currentCollection ?? 0);
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
