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
  const collections = useLiveQuery(() => db.userCollections.toArray()) ?? [];

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

  const addFileToCollection = (collection: fsaCollection, file: fsaFile) => {
    fsaAddFileToCollection( file,collection).then((res) => res);
  };

  const removeFileFromCollection = (
    collection: fsaCollection,
    file: fsaFile
  ) => {
    fsaRemoveFileFromCollection(collection, file).then((res) => res);
  };
  const updateCollection = (collection: fsaCollection) => {
    fsaUpdateCollection(collection).then((res) => res);
  };

  return {
    collections,
    addCollection,
    removeCollection,
    addFileToCollection,
    removeFileFromCollection,
    updateCollection,
  };
};

export  {useCollections};
