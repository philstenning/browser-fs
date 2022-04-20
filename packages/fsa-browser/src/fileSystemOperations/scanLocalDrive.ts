import md5 from "md5";
import { FoldersToExcludeFromScanning } from "../excludedFolders";
import { VirtualFileSystemEntry } from "./types";
import { checkPermissionsOfHandle } from "./handlePermissionsCheck";

/**
 * From the point of entry we scan the local drive recursively for Directories
 * and files with a given file extension.
 *
 * @param directoryHandle the root from where we want to scan from
 * @param fileTypes an array of the files we want to return in the results
 * @param _depth current depth of scan not to be set by user
 * @param maxDepth how deep do you want to scan
 * @returns Promise of VirtualFileSystemEntry that is recursive.
 */
async function scanLocalDrive(
  directoryHandle: FileSystemDirectoryHandle,
  fileTypes = ['jpg','png','gif'],
  maxDepth = 10,
  excludedFolders: string[] = FoldersToExcludeFromScanning
) {

  console.log(` scanning Root Directory for ${JSON.stringify(fileTypes)}`)
  // create the root object
  const root = createVirtualFileSystemEntry(directoryHandle);

  // scan the rest of the directory
  const entries = await scanLocalDriveRecursively(
    directoryHandle,
    fileTypes,
    maxDepth,
    excludedFolders
  );
  // add the the result of the scan to the root entries.
  root.entries = entries;
  return root;
}

/**
 * From the point of entry we scan the local drive recursively for Directories
 * and files with a given file extension.
 * @param directoryHandle the root from where we want to scan from
 * @param fileTypes an array of the files we want to return in the results
 * @param _depth current depth of scan not to be set by user
 * @param maxDepth how deep do you want to scan
 * @param excludedFolders an array of strings, folders that you want to exclude
 * from scanning [node_modules, junk, ]
 * @returns Promise of an Object representing the directory structure with only the file extensions
 * supplied in the args.
 */
async function scanLocalDriveRecursively(
  directoryHandle: FileSystemDirectoryHandle,
  fileTypes = ["3mf", "stl"],
  maxDepth = 5,
  excludedFolders: string[] = FoldersToExcludeFromScanning,
  _depth = 0,
  _path = ""
) {
  const res = await checkPermissionsOfHandle(directoryHandle);
  if (!res) return [];
  const directoryContent: VirtualFileSystemEntry[] = [];
  for await (const entry of directoryHandle.values()) {
    const name = entry.name.toLowerCase();
    if (entry.kind === "file") {
      // Create VirtualFileSystemEntry object from file
      const virtualFile = createVirtualFileSystemHandleFromFile(
        entry,
        _path,
        _depth,
        fileTypes
      );
      if (virtualFile) {
        directoryContent.push(virtualFile);
      }
    } else {
      // check to see if the current Directory is in the list
      // of excluded folders.
      if (!excludedFolders.includes(name)) {
        // we have a maxDept flag to prevent going it too deep
        // with the recursive scan
        if (_depth < maxDepth) {
          // call self to recursively scan drive
          console.log({ _depth }, `${_path}/${entry.name}`);
          const entryContent = await scanLocalDriveRecursively(
            entry,
            fileTypes,
            maxDepth,
            excludedFolders,
            _depth + 1,
            `${_path}/${entry.name}`
          );

          const folder = createVirtualFileSystemEntry(
            entry,
            `${_path}/${entry.name}`,
            _depth,
            "",
            entryContent
          );
          directoryContent.push(folder);
        } else {
          // we don't want to scan recursively
          const folder = createVirtualFileSystemEntry(
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

function createVirtualFileSystemHandleFromFile(
  handle: FileSystemDirectoryHandle | FileSystemFileHandle,
  path: string,
  depth: number,
  fileTypes: string[]
) {
  const { name } = handle;
  // get the file extension
  const fileExtension = name.slice(((name.lastIndexOf(".") - 1) >>> 0) + 2);
  // check if current file has the the requested extension.
  if (!fileTypes.includes(fileExtension)) return null;
  const file = createVirtualFileSystemEntry(
    handle,
    `${path}/${name}`,
    depth,
    fileExtension
  );
  return file;
}

function createVirtualFileSystemEntry(
  handle: FileSystemDirectoryHandle | FileSystemFileHandle,
  path = "",
  depth = 0,
  extension = "",
  entries: VirtualFileSystemEntry[] = []
): VirtualFileSystemEntry {
  return {
    id: md5(`${handle.name}${path}`),
    name: handle.name,
    depth,
    path,
    kind: handle.kind,
    handle,
    extension,
    entries,
    hasReadPermission: true,
  };
}

export { scanLocalDrive };
