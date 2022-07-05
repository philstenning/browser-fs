import { VirtualRootDirectoryType } from "./types";
declare function deleteAllVirtualRootDirectories(): Promise<boolean>;
declare function deleteVirtualRootDirectory(virtualFileSystemEntry: VirtualRootDirectoryType, prependedText?: string): Promise<boolean>;
export { deleteAllVirtualRootDirectories, deleteVirtualRootDirectory };
