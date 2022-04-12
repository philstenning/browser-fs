import { fsaCollection, fsaFile } from "../types";
import { putCollectionAndFile } from "./putCollectionAndFile";

export async function removeFileFromCollection(
  collection: fsaCollection,
  file: fsaFile
) {
  // if file is not in collection return
  if (!file.id || !collection.id) return;

  //get file ids
  const _fileIds = collection.files.map((f) => f.fileId);
  // if its not in the collection return
  if (!_fileIds.includes(file.id)) return false;

  // remove collection id from file.userCollections
  file.userCollectionIds = file.userCollectionIds.filter(
    (f) => f !== collection.id
  );
  // remove the fsaCollectionFile from the collection
  collection.files = collection.files.filter((f) => f.fileId !== file.id);

  // save all to db.
  return await putCollectionAndFile(collection, file);
}
