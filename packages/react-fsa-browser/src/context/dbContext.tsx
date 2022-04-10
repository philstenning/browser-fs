import React, { useState, useContext, createContext, useEffect } from "react";
import {
  db,
  fsaDirectory,
  initializeDb,
  fsaCollection,
  fsaFile,
  fsaState,
} from "fsa-database";

type FsaDbContextType = {
  // currentCollection: fsaCollection | null;
  // currentDirectory: fsaDirectory | null;
  // currentFile: fsaFile | null;
  // currentRootDirectory: fsaDirectory | null;
  // stateId: number | null;
  dbState: fsaState;
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
  /////
  const [dbState, setDbState] = useState<fsaState>({
    currentCollection: 0,
    currentDirectory: 0,
    currentFile: 0,
    currentRootDirectory: 0,
  });

  function saveState(state: fsaState) {
    delete state.id;
    db.state
      .add(state)
      .then((res) => {
        if (res > 0) {
          // we have a new id, id is readonly
          // so create a new obj.
          setDbState( { ...state, id: res });
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  function setCurrentDirectory(dir: fsaDirectory) {
    if (dir.id === dbState.currentDirectory) return;
    saveState({ ...dbState, currentDirectory: dir.id ?? 0 });
  }
  function setCurrentRootDirectory(dir: fsaDirectory) {
    if (dir.id === dbState.currentRootDirectory) return;
    saveState({ ...dbState, currentRootDirectory: dir.id ?? 0 });
  }
  function setCurrentFile(file: fsaFile) {
    if (file.id === dbState.currentFile) return;
    // _setCurrentFile(file);
    saveState({ ...dbState, currentFile: file.id ?? 0 });
    // saveState();
  }

  function setCurrentCollection(collection: fsaCollection) {
    if (collection.id === dbState.currentCollection) return;
    saveState({ ...dbState, currentCollection: collection.id ?? 0 });
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
    if (!initialState) return;

    setDbState(initialState);
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <FsaDbContext.Provider
      value={{
        dbState,
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
