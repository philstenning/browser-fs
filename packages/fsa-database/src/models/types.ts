export interface fsaBase {
  id: string
  name: string
  created: number
  creator: string
  updated: number
}

export interface fsaDirectory extends fsaBase {
  parentId: string | null
  handle: FileSystemDirectoryHandle
  isRoot: 'true' | 'false'
  rootId: string
  depth: number
  fileIds: string[]
  fileCount: number
  path: string
  label: string
  hidden: 'true' | 'false'
  lastChecked: number
  readPermission: 'true' | 'false'
  isScanning: boolean
  scanFinished: boolean
  scanDepth: number
  isLocal: boolean
}
export interface fsaFile extends fsaBase {
  parentId: string
  InitialParentId: string
  rootId: string
  handle: FileSystemFileHandle
  path: string
  printed: boolean
  description?: string
  type: string
  size?: string
  uniqueName?: string | null // used in collections if the name already exists.

  tags: string[]
  imageUrl?: string
  userCollectionIds: string[]
  order: number
  hidden: 'true' | 'false'
  lastChecked: number
  blob?: File
}

export interface fsaCollection extends fsaBase {
  files: fsaCollectionFile[]
  description?: string
  tags: string[]
  parentHandle?: FileSystemDirectoryHandle
  handle?: FileSystemDirectoryHandle
  saveToFileSystem: boolean
}

export interface fsaCollectionFile {
  fileId: string
  added: number
  order: number
  name: string
}

export interface fsaState {
  id?: number
  currentCollectionId: string | null
  currentDirectoryId: string | null
  currentRootDirectoryId: string | null
  currentFileId: string | null
  isScanning: boolean
}

export interface fsaUser {
  id?: number
  name: string
  link?: string
  email?: string
}

export type fsaFileType = {
  id?: number
  name: string
  selected: boolean
  hidden: boolean
}

export type fsaError = {
  id?: number // auto generated by db.
  message: string
  success: boolean
  info: string
  type: 'warning' | 'error' | 'unknown'
}

export interface fsaSetting {
  id?: number
  /**
   * time the current session started 
   */
  sessionStarted: number
  /**
   * when files are removed from a collection,
   * or a collection is deleted
   * removed files  from local disk also
   */
  cleanUpFiles: boolean
  /**
   * when a file is added to collection
   * save to disk
   */
  autoSaveCollections: boolean
  /**
   * @default  0 or none.
   */
  scanInterval: number
  lastScanned: number
  /**
   * when adding with drag and drop whether
   * to add files to a new folder
   */
  allowDndFiles: boolean
  /**
   * When resetting db retain all root Directories.
   * */
  retainRootDirectoriesOnReset: boolean
}

export interface fsaExcludedDirectory {
  id?: number
  name: string
}
