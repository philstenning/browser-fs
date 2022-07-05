/// <reference types="wicg-file-system-access" />
declare function checkPermissionsOfHandle(handle: FileSystemDirectoryHandle | FileSystemFileHandle, mode?: FileSystemPermissionMode): Promise<boolean>;
export { checkPermissionsOfHandle };
