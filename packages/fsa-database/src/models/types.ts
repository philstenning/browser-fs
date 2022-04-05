export interface fsaBase {
  id?: number;
  name: string;
  created: number;
  creator?: fsaUser | null;
  updated: number;
}

export interface fsaDirectory extends fsaBase {
  handle: FileSystemDirectoryHandle;
  isRoot: "true" | "false";
  rootId: number;
  depth: number;
  partIds: number[];
  path: string;
  label: string;
  hidden: "true" | "false";
}
export interface fsaFile extends fsaBase {
  folderId: number;
  rootId: number;
  handle: FileSystemFileHandle;
  path:string;
  printed: boolean;
  description?: string;
  type: fsaFileTypes;
  size?: number;
  tags: fsaTag[];
  imageUrl?: string;
  collections: number[];
}

export interface fsaUserCollection extends fsaBase {
  files: fsaFile[];
  description?: string;
  tags: fsaTag[];
}

export interface fsaUser {
  id?: number;
  name: string;
  link?: string;
  email?:string
}

export interface fsaTag {
  id?: number;
  name: string;
}

export enum fsaFileTypes {
  STL,
  OBJ,
  GCODE,
  THREE_MF,
  NOT_SUPPORTED,
}
