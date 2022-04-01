export interface VirtualRootDirectory {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  handle: FileSystemDirectoryHandle;
  hasReadPermission: boolean;
  
  rootParts?: number;
  filePath?: string;
}

export interface VirtualFileSystemEntry {
  id: string;
  name: string;
  hasReadPermission:boolean
  handle: FileSystemDirectoryHandle | FileSystemFileHandle;

  depth?: number;
  path?: string;
  pathR?: any;
  kind: "file" | "directory";
  extension: string;
  entries?: VirtualFileSystemEntry[];
}

