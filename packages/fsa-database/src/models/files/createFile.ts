import { fsaFile } from "../types";
import { v4 as uuid } from "uuid";
export function createFile(
  handle: FileSystemFileHandle,
  parentId: string,
  rootId: string,
  path: string,
  type: string,
  name: string = handle.name,
  creator = "UserId",
  printed: boolean = false,
  tags: string[],
  description: string = "",
  imageUrl: string = "",
  userCollectionIds: string[] = []
) {
  const createdAt = Date.now();
  const file: fsaFile = {
    id: uuid(),
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
    order: 0,
    hidden: "false",
    InitialParentId: parentId,
  };

  return file;
}
