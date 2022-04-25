import { fsaFile } from "../types";
import { v4 as uuid } from "uuid";
export async function createFile(
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
  const size = bytesToSize((await handle.getFile()).size) ;
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
    lastChecked: createdAt,
    size,
  };

  return file;
}



export function bytesToSize(bytes:number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const num =(Math.floor(Math.log(bytes) / Math.log(1024))).toString()
  const i = parseInt(num, 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}