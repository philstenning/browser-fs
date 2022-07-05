import type { VirtualRootDirectoryType } from "../virtualRootDirectories/";
export declare function selectRootDirectoryOnLocalDrive(dirPath?: string): Promise<VirtualRootDirectoryType | null>;
export declare function createVirtualRootDirectory(dirHandle: FileSystemDirectoryHandle, filePath?: string, isRoot?: boolean, rootId?: string, parts?: number): VirtualRootDirectoryType;
