export interface VirtualDirectory {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  isRoot: boolean;
  rootId: string;
  handle: FileSystemDirectoryHandle;
  // the number of parts or files it  has in it.
  // parts: number;
  // optional

  // if it is a root dir count of parts
  rootParts?: number;
  filePath?: string;
}

export interface VirtualFileSystemHandle {
  id: string;
  name: string;
  depth?: number;
  path?: string;
  pathR?: any;
  kind: "file" | "directory";
  handle: FileSystemDirectoryHandle | FileSystemFileHandle;
  extension: string;
  entries?: VirtualFileSystemHandle[];
  
}

