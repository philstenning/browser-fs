import { db } from "../../db/setup";
import { fsaCollection, fsaFile } from "../types";
import {putCollectionAndFile} from './putCollectionAndFile'
export async function addFileToCollection(
  file: fsaFile,
  collection?: fsaCollection
) {
  console.log({ file }, { collection });
  if (!file.id) return false;
  // if we don't pass in a collection
  // try and retrieve one from the state.
  if (!collection) {
    const state = await db.state.toCollection().last();

    // state.currentCollection is zero if not set.
    if (!state || state.currentCollection === 0) {
      console.error("no collection to add too, make one first.");
      return false;
    }

    const stateCollection = await db.userCollections.get(
      state.currentCollection
    );
    if (!stateCollection) {
      console.error("No collection to add to still");
      return false;
    }
    collection = stateCollection;
  }
  console.log({ collection });

  if (!collection.id) return false; // TODO smelly change to uuid? and set at init.
  if (collection.files.includes(file.id)) return false;
  collection.files.push(file.id);
  file.userCollectionIds.push(collection.id);
  return await putCollectionAndFile(collection, file);
}
