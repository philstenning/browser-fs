import React, { useState, useContext, createContext, useEffect } from "react";
import {
  createRootDbDirectory,
  db,
  fsaDirectory,
  parseVirtualFileSystemEntry,
  deleteRootDbDirectoryAndFiles,
  initializeDb,
  useLiveQuery,
  fsaCollection,
  fsaFile,
  fsaState,
} from "fsa-database";
import { selectRootDirectoryOnLocalDrive, scanLocalDrive } from "fsa-browser";

type FsaDbContextType = {
  currentCollection: fsaCollection | null;
  currentDirectory: fsaDirectory | null;
  currentFile: fsaFile | null;
  currentRootDirectory: fsaDirectory | null;
  stateId: number | null;
  setCurrentDirectory: (dir: fsaDirectory) => void;
  setCurrentRootDirectory: (dir: fsaDirectory) => void;
  setCurrentCollection: (collection: fsaCollection) => void;
  setCurrentFile: (file: fsaFile) => void;
};

const FsaDbContext = createContext<FsaDbContextType | null>(null);

function useFsaDbContext() {
  return useContext(FsaDbContext) as FsaDbContextType;
}

type Props = {
  children: React.ReactNode;
  fileExtensionsForApp?: string[];
};

/**
 *
 * @param param0
 * @returns
 */
function FsaDbContextProvider({
  children,
  fileExtensionsForApp = ["stl", "gcode", "3mf", "jpg"],
}: Props) {
  const [currentCollection, _setCurrentCollection] =
    useState<fsaCollection | null>(null);
  const [currentDirectory, _setCurrentDirectory] =
    useState<fsaDirectory | null>(null);
  const [currentFile, _setCurrentFile] = useState<fsaFile | null>(null);
  const [currentRootDirectory, _setCurrentRootDirectory] =
    useState<fsaDirectory | null>(null);
  const [stateId, setStateId] = useState(0);

  function saveState() {
    db.state
      .add({
        currentCollection,
        currentDirectory,
        currentFile,
        currentRootDirectory,
      })
      .then((id) => id);
  }

  function setCurrentDirectory(dir: fsaDirectory) {
    _setCurrentDirectory(dir.id ?? 0);
    saveState();
  }
  function setCurrentRootDirectory(dir: fsaDirectory) {
    _setCurrentRootDirectory(dir.id ?? 0);
    saveState();
  }
  function setCurrentFile(file: fsaFile) {
    _setCurrentFile(file.id ?? 0);
    saveState();
  }

  function setCurrentCollection(collection: fsaCollection) {
    _setCurrentCollection(collection.id ?? 0);
    saveState();
  }

  /**
   * Runs at startup of component
   * Loads data into state objects.
   */
  async function getInitialData(): Promise<void> {
    // if this is the first time the db has been opened
    // we need to add some fileTypes
    await initializeDb(fileExtensionsForApp);

    const initialState = await db.state.toCollection().last();
    if (!initialState)return;
    

    const collection = await db.userCollections.get(
      initialState.currentCollection
    );

    _setCurrentCollection(collection ?? null);

    const dir = await db.directories.get(initialState.currentDirectory);
    _setCurrentDirectory(dir ?? null);

    const root = await db.directories.get(initialState.currentRootDirectory);
    _setCurrentRootDirectory(root ?? null);

    const file = await db.files.get(initialState.currentFile);
    _setCurrentFile(file ?? null);

    setStateId(initialState.id || 0);
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <FsaDbContext.Provider
      value={{
        stateId,
        currentCollection,
        currentDirectory,
        currentFile,
        currentRootDirectory,
        setCurrentCollection,
        setCurrentDirectory,
        setCurrentFile,
        setCurrentRootDirectory,
      }}
    >
      {children}
    </FsaDbContext.Provider>
  );
}

export { FsaDbContextProvider, useFsaDbContext };
export type { FsaDbContextType };
