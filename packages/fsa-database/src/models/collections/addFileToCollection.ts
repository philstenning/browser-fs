import { db } from "../../db/setup";
import { fsaCollection, fsaFile, fsaCollectionFile } from "../types";
import { putCollectionAndFile } from "./putCollectionAndFile";
import {getFileExtension,getFileNameWithoutExtension} from '../../utils'
export async function addFileToCollection(
  file: fsaFile,
  collection?: fsaCollection
) {
  if (!file.id) return false;
  // if we don't pass in a collection
  // try and retrieve one from the state.
  if (!collection) {
    // get the last state object saved
    const state = await db.state.toCollection().last();

    // state.currentCollection is zero if not set.
    if (!state || !state.currentCollectionId) {
      console.error("no collection to add too, make one first.");
      return false;
    }

    let stateCollection = await db.userCollections.get(
      state.currentCollectionId
    );
    if (!stateCollection) {
      // if we got here there is no save state collection
      // if there is a single collection retrieve that
      // as an assumption the user knows they only have one
      // so would want to save it to it.
      if ((await db.userCollections.count()) === 1) {
        stateCollection = await db.userCollections.toCollection().first();
      }
      if (!stateCollection) return false;
    }
    collection = stateCollection;
  }

  // create file
  const collectionFile: fsaCollectionFile = createCollectionFile(file);
  if (!collection) return false;
  // check if file with same id exists already
  for (const f of collection.files) {
    if (f.fileId === collectionFile.fileId) {
      return;
    }
  }
  collectionFile.name = checkIfFileWithSameNameExists(file.name, collection);
  // increment all current file orders
  collection.files.map((f) => ({ ...f, order: f.order++ }));
  // now add at order 0
  collection.files.push(collectionFile);
  file.userCollectionIds.push(collection.id);
  return await putCollectionAndFile(collection, file);
}

function createCollectionFile(file: fsaFile): fsaCollectionFile {
  return {
    fileId: file.id,
    added: Date.now(),
    order: 0,
    name: file.name,
  };
}

function checkIfFileWithSameNameExists(
  fileName: string,
  collection: fsaCollection,
  substituteString: string = "__duplicate"
) {
  let counter = 0;
  let fileNameWithoutExt = getFileNameWithoutExtension(fileName);
  const ext = getFileExtension(fileName);

  // match all occurrences of the string
  const test = `${substituteString}\([1-9]\)+`;
  const re = new RegExp(test,'gi')

  const match = fileNameWithoutExt.match(re);

  // if it already has a suffix remove it.
  if (match) {
    const withoutIndex = fileNameWithoutExt.lastIndexOf(
      match[match?.length - 1]
    );
    fileNameWithoutExt = fileNameWithoutExt.substring(0, withoutIndex);
  }

  let tempName = fileNameWithoutExt;
  while (
    collection.files.filter(
      (f) => f.name.substring(0, f.name.indexOf(".")) === tempName
    ).length > 0
  ) {
    counter++;
    tempName = `${fileNameWithoutExt}__duplicate(${counter})`;
  }
  return `${tempName}${ext}`;
}

