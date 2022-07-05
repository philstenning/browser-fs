import type { VirtualFileSystemEntry } from '../fileSystemOperations/types';
declare function scanLocalDrive(directoryHandle: FileSystemDirectoryHandle, fileTypes?: string[], maxDepth?: number, excludedFolders?: string[]): Promise<VirtualFileSystemEntry>;
export { scanLocalDrive };
