export interface IDbBase {
  id: string;
  name: string;
  created: Date;
  creator?: IUser;
  updated: Date;
}

export interface IDbFolder extends IDbBase {
  handle: FileSystemDirectoryHandle;
  isRoot: boolean;
  rootId: string;
  depth:number;
  parts: IDbFile[];
  path: string;
  label:string;
}
export interface IDbFile extends IDbBase {
  folderId: string;
  rootId: string;
  handle: FileSystemFileHandle;
  printed: boolean;
  description?: string;
  type: FileTypes;
  size?: number;
  tags: ITag[];
  imageUrl?: string;
  collections  :IDbCollection[]
}

export interface IDbCollection extends IDbBase {
  files: IDbFile[];
  description?: string;
  tags: ITag[];
}

export interface IUser {
  id: string;
  name: string;
  link?: string;
}

export interface ITag {
  id: string;
  name: string;
}

export enum FileTypes {
  STL,
  OBJ,
  GCODE,
  THREE_MF,
  NOT_SUPPORTED,
}
