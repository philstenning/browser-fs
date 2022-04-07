import { useState } from "react";
import { selectRootDirectoryOnLocalDrive, scanLocalDrive } from "fsa-browser";
import {
  parseVirtualFileSystemEntry,
  createRootDbDirectory,
} from "fsa-database";
import { useFileTypesNames } from "../../index";
/**
 * Opens the window.showDirectoryPicker and allows
 * user to select a folder to scan for files.
 * once selected it saves the entry to the database and
 * adds it to the state object rootDbDirectories
 * then set it as the currentDirectory
 */
export function useAddRootDirectory() {
  const [isScanning, setIsScanning] = useState(false);
  const names = useFileTypesNames();

  const addRootDirectory = () => {
    selectRootDirectoryOnLocalDrive().then((virtualDir) => {
      if (!virtualDir) return;
      setIsScanning(true);
      // save to db
      createRootDbDirectory(virtualDir.handle).then((dir) => {
        // scan drive for folders and files
        scanLocalDrive(virtualDir.handle, names, 100).then((data) => {
          if (!data.id) return;
          if (!dir) return;
          if (dir.id) {
            parseVirtualFileSystemEntry(data, dir.id, dir.id).then(()=>{
                setIsScanning(false)
                console.log('scanning finished')

            }
            )
          }
        });
      });
    });

    setIsScanning(false);
  };

  return { isScanning, addRootDirectory };
}
