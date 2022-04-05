import React, { useState, useContext, createContext, useEffect } from "react";
import {
  createDirectory,
  createRootDbDirectory,
  db,
  fsaDirectory,
} from "fsa-database";
import { selectRootDirectoryOnLocalDrive } from "fsa-browser";

type FsaDbContextType = {
  currentDbDirectory: fsaDirectory | null;
  setCurrentDbDirectory: (dir: fsaDirectory) => void;
  rootDbDirectories: fsaDirectory[];
  addRootDirectory: () => void;
  deleteRootDirectory: (dir: fsaDirectory) => Promise<boolean>;
};

const FsaDbContext = createContext<FsaDbContextType | null>(null);

function useFsaDbContext() {
  return useContext(FsaDbContext) as FsaDbContextType;
}

type Props = {
  children: React.ReactNode;
};

function FsaDbContextProvider({ children }: Props) {
  const [currentDbDirectory, _setCurrentDbDirectory] =
    useState<fsaDirectory | null>(null);
  const [rootDbDirectories, setRootDbDirectories] = useState<fsaDirectory[]>(
    []
  );

  function setCurrentDbDirectory(dir: fsaDirectory) {
    _setCurrentDbDirectory(dir);
  }

  async function getInitialData() {
    // const dirs = await db.directories.where({ isRoot: true }).toArray();
    const dirs = await db.directories.where({isRoot:'true'}).toArray();
    if (dirs.length > 0) {
      setRootDbDirectories(dirs);

      //TODO this needs to be retrieved from a store of some kind.
      _setCurrentDbDirectory(dirs[0]);
    }
  }

  async function addRootDirectory() {
    const virtualDir = await selectRootDirectoryOnLocalDrive();
    if (virtualDir) {
      const dir = await createRootDbDirectory(virtualDir.handle);
      if (dir) {
        setRootDbDirectories((current) => [...current, dir]);
        _setCurrentDbDirectory(dir);
      }
    }
  }

  async function deleteRootDirectory(dir: fsaDirectory) {
      // if you are getting some unexpected things happening 
      // check that the event is not propagating to the 
      // parent element.
    if (dir.id) {
      await db.directories.delete(dir.id);
      const filtered = rootDbDirectories.filter((d) => d.id !== dir.id);
      setRootDbDirectories(filtered);

      // if it is the current selected item, 
      // select the first of the filtered array
      // or null if it is now empty.
      if (currentDbDirectory?.id === dir.id){
          if (filtered.length > 0 ) {
            _setCurrentDbDirectory(filtered[0]);
          }
      }
      if(filtered.length===0){
          _setCurrentDbDirectory(null)
      }
    }

  
    return false;
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <FsaDbContext.Provider
      value={{
        currentDbDirectory,
        setCurrentDbDirectory,
        rootDbDirectories,
        addRootDirectory,
        deleteRootDirectory,
      }}
    >
      {children}
    </FsaDbContext.Provider>
  );
}

export { FsaDbContextProvider, useFsaDbContext };
export type { FsaDbContextType };
