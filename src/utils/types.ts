
interface IVirtualFolderBase {
  id?: string;
  name: string;
  created: Date;
  updated: Date;
  isRoot: boolean;
  rootId: string;
  // the number of parts or files it  has in it.
  parts: number;
  // optional

  // if it is a root dir count of parts
  rootParts?: number;
  filePath?: string;
}

// export interface IVirtualFolder extends IVirtualFolderBase {
//   id: string;
//   readonly created: Date;
// }


export interface IVirtualDirectory {
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