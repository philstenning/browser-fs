export interface VirtualRootDirectory {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  handle: FileSystemDirectoryHandle;
  rootParts?: number;
  filePath?: string;
}

export interface VirtualFileSystemEntry {
  id: string;
  name: string;
  depth?: number;
  path?: string;
  pathR?: any;
  kind: "file" | "directory";
  handle: FileSystemDirectoryHandle | FileSystemFileHandle;
  extension: string;
  entries?: VirtualFileSystemEntry[];
  hasReadPermission:boolean
  
}

