import { fsaCollection, fsaFile } from "../types";
import { putCollectionAndFile } from "./putCollectionAndFile";

export async function removeFileFromCollection(
  collection: fsaCollection,
  file: fsaFile
) {
  // if file is not in collection return
  if (!file.id || !collection.id) return;
  if (!collection.files.includes(file.id)) return false;
  console.log("fun", { collection }, { file });
  const fileIds = file.userCollectionIds.filter((f) => f !== collection.id);
  const colIds = collection.files.filter((f) => f !== file.id);
  collection.files = colIds;
  file.userCollectionIds = fileIds;
  return await putCollectionAndFile(collection, file);
}
