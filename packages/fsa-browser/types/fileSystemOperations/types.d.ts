interface VirtualFileSystemEntry {
    id: string;
    name: string;
    hasReadPermission: boolean;
    handle: FileSystemDirectoryHandle | FileSystemFileHandle;
    depth?: number;
    path?: string;
    pathR?: any;
    kind: "file" | "directory";
    extension: string;
    entries?: VirtualFileSystemEntry[];
}
export type { VirtualFileSystemEntry };
