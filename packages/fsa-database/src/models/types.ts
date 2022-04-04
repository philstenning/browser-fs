export interface IDbBase {
  id?: number;
  name: string;
  created: number;
  creator?: IUser;
  updated: number;
}

export interface IDbFolder extends IDbBase {
  handle: FileSystemDirectoryHandle;
  isRoot: boolean;
  rootId: number;
  depth:number;
  // parts: IDbFile[];
  path: string;
  label:string;
}
export interface IDbFile extends IDbBase {
  folderId: number;
  rootId: number;
  handle: FileSystemFileHandle;
  path:string;
  printed: boolean;
  description?: string;
  type: FileTypes;
  size?: number;
  tags: ITag[];
  imageUrl?: string;
  collections: number[];
}

export interface IDbCollection extends IDbBase {
  files: IDbFile[];
  description?: string;
  tags: ITag[];
}

export interface IUser {
  id?: number;
  name: string;
  link?: string;
  email?:string
}

export interface ITag {
  id?: number;
  name: string;
}

export enum FileTypes {
  STL,
  OBJ,
  GCODE,
  THREE_MF,
  NOT_SUPPORTED,
}
