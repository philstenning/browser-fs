export interface fsaBase {
  id: string;
  name: string;
  created: number;
  creator: string;
  updated: number;
}

export interface fsaDirectory extends fsaBase {
  parentId: string | null;
  handle: FileSystemDirectoryHandle;
  isRoot: "true" | "false";
  rootId: string;
  depth: number;
  fileIds: string[];
  fileCount: number;
  path: string;
  label: string;
  hidden: "true" | "false";
  lastChecked: number;
  readPermission: "true" | "false";
  isScanning: boolean;
  scanFinished: boolean;
}
export interface fsaFile extends fsaBase {
  parentId: string;
  InitialParentId: string;
  rootId: string;
  handle: FileSystemFileHandle;
  path: string;
  printed: boolean;
  description?: string;
  type: string;
  size?: string;

  tags: string[];
  imageUrl?: string;
  userCollectionIds: string[];
  order: number;
  hidden: "true" | "false";
  lastChecked: number;
}

export interface fsaCollection extends fsaBase {
  files: fsaCollectionFile[];
  description?: string;
  tags: string[];
  parentHandle?: FileSystemDirectoryHandle;
  handle?: FileSystemDirectoryHandle;
  saveToFileSystem: boolean;
}

export interface fsaCollectionFile {
  fileId: string;
  added: number;
  order: number;
  name:string;
}

export interface fsaState {
  id?: number;
  currentCollectionId: string | null;
  currentDirectoryId: string | null;
  currentRootDirectoryId: string | null;
  currentFileId: string | null;
}

export interface fsaUser {
  id?: number;
  name: string;
  link?: string;
  email?: string;
}

export type fsaFileType = {
  id?: number;
  name: string;
  selected: boolean;
  hidden: boolean;
};

export type fsaError = {
  id?: number; // auto generated by db.
  message: string;
  success: boolean;
  info: string;
  type: "warning" | "error" | "unknown";
};

export interface fsaSettingCreate {
  sessionStarted: number;
  // if a file is removed from collection it is
  //removed from local disk also
  cleanFilesFromCollections: boolean;
  // when a collection is removed
  // remove all files and its directory
  // from local disk
  cleanCollectionsWhenRemoved: boolean;
  lastScanned:number
}
export interface fsaSetting extends fsaSettingCreate {
  id: number;

}
