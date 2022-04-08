export interface fsaBase {
  readonly id?: number;
  name: string;
  created: number;
  creator:string;
  updated: number;
}

export interface fsaDirectory extends fsaBase {
  handle: FileSystemDirectoryHandle;
  isRoot: "true" | "false";
  rootId: number;
  depth: number;
  fileIds: number[];
  fileCount:number;
  path: string;
  label: string;
  hidden: "true" | "false";
}
export interface fsaFile extends fsaBase {
  parentId: number;
  rootId: number;
  handle: FileSystemFileHandle;
  path:string;
  printed: boolean;
  description?: string;
  type: string;
  size?: number;
  tags: string[];
  imageUrl?: string;
  userCollectionIds: number[];
}

export interface fsaCollection extends fsaBase {
  // id:string;
  files: number[];
  description?: string;
  tags: string[];
}

export interface fsaState {
  currentFile:number;
  currentDirectory:number;
  currentCollection:number;
}

export interface fsaUser {
  id?: number;
  name: string;
  link?: string;
  email?:string
}


export type fsaFileType = {
  id?: number;
  name: string;
  selected: boolean;
  hidden: boolean;
};
