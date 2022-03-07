import md5 from "md5";
import { excludedFolders as _excludedFolders } from "./excludedFolders";

export interface VirtualFileSystemHandle {
  id:string,
  name: string;
  depth?: number;
  path?: string;
  kind: "file" | "directory";
  handle: FileSystemDirectoryHandle | FileSystemFileHandle;
  extension: string;
  entries?: VirtualFileSystemHandle[];
}

export class DriveScanError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "DriveScanError";
  }
}

/**
 * From the point of entry we scan the local drive recursively for Directories
 * and files with a given file extension.
 * @param directoryHandle the root from where we want to scan from
 * @param fileTypes an array of the files we want to return in the results
 * @param depth current depth of scan not to be set by user
 * @param maxDepth how deep do you want to scan
 * @param excludedFolders an array of folders that you want to exclude
 * from scanning
 * @returns Promise of an Object representing the directory structure with only the file extensions
 * supplied in the args.
 */
async function scanLocalDriveRecursively(
  directoryHandle: FileSystemDirectoryHandle,
  fileTypes = ["stl", "3mf"],
  maxDepth = 5,
  excludedFolders: string[] = _excludedFolders,
  _depth = 0,
  _path = ""
) {
  const directoryContent: VirtualFileSystemHandle[] = [];
  for await (const entry of directoryHandle.values()) {
    const name = entry.name.toLowerCase();

    if (entry.kind === "file") {
      // get the file extension
      const fileExtension = name.slice(((name.lastIndexOf(".") - 1) >>> 0) + 2);
      // check if current file has the the requested extension.
      if (fileTypes.includes(fileExtension)) {
        const file = createVirtualFileSystemHandle(
          entry,
          `${_path}/${entry.name}`,
          _depth,
          fileExtension
        );
        directoryContent.push(file);
      }
    } else {
      // check to see if the current Directory is in the list
      // of excluded folders.
      if (!excludedFolders.includes(name)) {
        // we have a maxDept flag to prevent going it too deep
        // with the recursive scan
        if (_depth < maxDepth) {
          // call self to recursively scan drive
          console.log(`depth: ${_depth}`);
          const entryContent = await scanLocalDriveRecursively(
            entry,
            fileTypes,
            maxDepth,
            excludedFolders,
            _depth + 1,
            `${_path}/${entry.name}`
          );

          const folder = createVirtualFileSystemHandle(
            entry,
            `${_path}/${entry.name}`,
            _depth ,
            "",
            entryContent
          );
          directoryContent.push(folder);
        } else {
          // we don't want to scan recursively
          const folder = createVirtualFileSystemHandle(
            entry,
            `${_path}/${entry.name}`,
            _depth,
            "",
            []
          );
          directoryContent.push(folder);
        }
      }
    }
  }
  return directoryContent;
}

function createVirtualFileSystemHandle(
  handle: FileSystemDirectoryHandle | FileSystemFileHandle,
  path = "",
  depth = 0,
  extension = "",
  entries: VirtualFileSystemHandle[] = []
): VirtualFileSystemHandle {
  return {
    id:md5(`${handle.name}${path}`),
    name: handle.name,
    depth,
    path,
    kind: handle.kind,
    handle,
    extension,
    entries,
  };
}

export { scanLocalDriveRecursively };
