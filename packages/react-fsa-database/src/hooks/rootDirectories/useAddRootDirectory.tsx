import { useState } from "react";
import { selectRootDirectoryOnLocalDrive, scanLocalDrive } from "fsa-browser";
import {
  parseVirtualFileSystemEntry,
  createRootDirectory,
  db,
  saveState,
  fsaDirectory,
  getFileTypeNames
} from "fsa-database";
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
  
  const addRootDirectory = async () => {
    const virtualDir = await selectRootDirectoryOnLocalDrive();
    if (!virtualDir) return;
    
    const state = await db.state.toCollection().last();
    if (!state) return;
    
    // save to db
    const dir = await createRootDirectory(virtualDir.handle);
    if (!dir || !dir.id) return;
    
    await saveState({ ...state, isScanning: true });
    
    setDirectoryIsScanning(true, dir);
    
    const names =await getFileTypeNames()
    // scan drive for folders and files
    const data = await scanLocalDrive(virtualDir.handle, names, 100);
    if (!data.id) return;
    await parseVirtualFileSystemEntry(data, dir.id, dir.id).then(() => {
      if (state) saveState({ ...state, isScanning: false });
    });

    // now set the current rootDir in dbState
    setCurrentRootDirectoryId(dir.id);

    setDirectoryIsScanning(false, dir);
    saveState({ ...state, isScanning: false });
  };

  return { addRootDirectory };
}

// set rootDir as scanning
// this is for the ui component to let it know that
// this directory  is in the process of scanning.
async function setDirectoryIsScanning(isScanning: boolean, dir: fsaDirectory) {
  if (isScanning) {
    dir.isScanning = true;
    dir.scanFinished = false;
  } else {
    dir.isScanning = false;
    dir.scanFinished = true;
  }

  try {
    await db.directories.put(dir);
  } catch (error) {
    console.error(`Error updating directory ${error}`);
  }

  return dir;
}
