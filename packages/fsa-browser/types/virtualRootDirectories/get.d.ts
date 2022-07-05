/// <reference types="wicg-file-system-access" />
import { VirtualRootDirectoryType } from "./types";
declare function getAllVirtualRootDirectories(prependedText?: string): Promise<VirtualRootDirectoryType[] | null>;
declare type Order = "asc" | "desc";
declare function orderDirectoriesByDate(directories: VirtualRootDirectoryType[], order?: Order): VirtualRootDirectoryType[];
declare function getAllVirtualRootDirectoriesAndCheckPermissions(mode?: FileSystemPermissionMode): Promise<VirtualRootDirectoryType[] | undefined>;
export { getAllVirtualRootDirectories, getAllVirtualRootDirectoriesAndCheckPermissions, orderDirectoriesByDate, };
