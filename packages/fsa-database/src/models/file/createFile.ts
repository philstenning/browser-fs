import { fsaFile } from "../types";

export function createFile(
  handle: FileSystemFileHandle,
  parentId: number,
  rootId: number,
  path: string,
  type: string,
  name: string = handle.name,
  creator = "UserId",
  printed: boolean = false,
  tags: string[],
  description: string = "",
  imageUrl: string = "",
  userCollectionIds: number[] = []
) {
  const createdAt = Date.now();
  const file: fsaFile = {
    name,
    handle,
    rootId,
    type,
    path,
    creator,
    parentId,
    printed,
    tags,
    description,
    created: createdAt,
    updated: createdAt,
    imageUrl,
    userCollectionIds,
  };

  return file;
}
