interface VirtualRootDirectory {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  handle: FileSystemDirectoryHandle;
  hasReadPermission: boolean;
  order?:number
  rootParts?: number;
  filePath?: string;
}


export type { VirtualRootDirectory };