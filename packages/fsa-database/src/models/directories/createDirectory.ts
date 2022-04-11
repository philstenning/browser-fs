import { fsaDirectory } from "../types";

export function createDirectory(
  handle: FileSystemDirectoryHandle,
  path: string,
  isRoot: boolean,
  rootId: number,
  fileIds = [],
  depth = 0,
  creator = "user"
) {
  const createdAt = Date.now();
  const directory: fsaDirectory = {
    created: createdAt,
    updated: createdAt,
    depth,
    handle,
    path,
    rootId,
    isRoot: isRoot ? "true" : "false",
    label: "",
    name: handle.name,
    creator,
    fileIds,
    fileCount: 0,
    hidden: "false",
  };
  return directory;
}
