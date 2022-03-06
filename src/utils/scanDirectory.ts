import { fileURLToPath } from "url";
import { IVirtualDirectory } from "./types";

interface VirtualFileSystemHandle {
  name: string;
  depth?: number;
  path?: string;
  kind: "file" | "directory";
  handle: FileSystemHandle;
  extension: string;
  entries: VirtualFileSystemHandle[];
}

export class DriveScanError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "DriveScanError";
  }
}

// const foo: VirtualFileSystemHandle = {
//   name: "foo",
//   kind: "directory",
// //   handle:
//   entries: [{ name: "fdf", kind: "directory", entries: [

//   ] }],
// };

/**
 * From the point of entry we scan the local drive recursively for Directories
 * and files with a given file extension.
 * @returns
 */
async function scanLocalDriveRecursively(
  directoryHandle: FileSystemDirectoryHandle,
  depth = 0,
  fileTypes =['stl','3mf']
) {
  for await (const entry of directoryHandle.values()) {
   if(entry.kind === "file") {
     const type = entry.name.toLowerCase().split('.')[1]
    
   }
  }
}

export { scanLocalDriveRecursively };
