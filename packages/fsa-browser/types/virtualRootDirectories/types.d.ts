interface VirtualRootDirectoryType {
    id: string;
    name: string;
    created: Date;
    updated: Date;
    handle: FileSystemDirectoryHandle;
    hasReadPermission: boolean;
    order?: number;
    rootParts?: number;
    filePath?: string;
}
declare type RootDirOrderType = "asc" | "desc";
export type { VirtualRootDirectoryType, RootDirOrderType };
