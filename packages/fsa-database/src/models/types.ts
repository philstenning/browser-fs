export interface fsaBase {
  id?: number;
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

export interface fsaUserCollection extends fsaBase {
  files: number[];
  description?: string;
  tags: string[];
}

export interface fsaUser {
  id?: number;
  name: string;
  link?: string;
  email?:string
}

// export interface fsaTag {
//   id?: number;
//   name: string;
// }

// export type fsaFileTypes ='stl'| 'obj'|'gcode'|'3mf'|'unknown'

// export enum fsaFileTypes {
//   STL,
//   OBJ,
//   GCODE,
//   THREE_MF,
//   NOT_SUPPORTED,
// }
