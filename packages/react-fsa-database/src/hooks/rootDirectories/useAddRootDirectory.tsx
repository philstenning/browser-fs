import { useState } from "react";
import { selectRootDirectoryOnLocalDrive, scanLocalDrive } from "fsa-browser";
import { parseVirtualFileSystemEntry, createRootDirectory ,db } from "fsa-database";
import { useFileTypesNames } from "../../index";
import { useFsaDbContext } from "../../context/dbContext";
/**
 * Opens the window.showDirectoryPicker and allows
 * user to select a folder to scan for files.
 * once selected it saves the entry to the database and
 * adds it to the state object rootDbDirectories
 * then set it as the currentDirectory
 */
export function useAddRootDirectory() {
  const { setCurrentRootDirectoryId } = useFsaDbContext();
  const [isScanning, setIsScanning] = useState(false);
  const names = useFileTypesNames();

  const addRootDirectory = async () => {
    const virtualDir = await selectRootDirectoryOnLocalDrive();
    if (!virtualDir) return;
    setIsScanning(true);
    // save to db
    const dir = await createRootDirectory(virtualDir.handle);

    // set rootDir as scanning
    if(dir){

      dir.isScanning=true
      dir.scanFinished=false
      await db.directories.put(dir)
    }
    // scan drive for folders and files
    const data = await scanLocalDrive(virtualDir.handle, names, 100);
    if (!data.id) return;
    if (!dir) return;
    if (dir.id) {
     await parseVirtualFileSystemEntry(data, dir.id, dir.id).then(() => {
        setIsScanning(false);
      });
    }
    // now set the current rootDir in dbState
    setCurrentRootDirectoryId(dir.id);
     if (dir) {
       dir.isScanning = false;
       dir.scanFinished = true;
       await db.directories.put(dir);
     }
    setIsScanning(false);
  };

  return { isScanning, addRootDirectory };
}
