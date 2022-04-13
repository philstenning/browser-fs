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
  setCurrentDirectoryId: (idOrNull: string | null) => void;
  setCurrentRootDirectoryId: (idOrNull: string | null) => void;
  setCurrentCollectionId: (idOrNull: string | null) => void;
  setCurrentFileId: (idOrNull: string | null) => void;
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
    currentCollectionId: null,
    currentDirectoryId: null,
    currentFileId: null,
    currentRootDirectoryId: null,
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

  function setCurrentDirectoryId(idOrNull: string | null) {
    saveState({ ...dbState, currentDirectoryId: idOrNull });
  }
  function setCurrentRootDirectoryId(idOrNull: string | null) {
    saveState({ ...dbState, currentRootDirectoryId: idOrNull });
  }
  function setCurrentFileId(idOrNull: string | null) {
    saveState({ ...dbState, currentFileId: idOrNull });
  }
  function setCurrentCollectionId(idOrNull: string | null) {
    saveState({ ...dbState, currentCollectionId: idOrNull });
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
        setCurrentCollectionId,
        setCurrentDirectoryId,
        setCurrentFileId,
        setCurrentRootDirectoryId,
      }}
    >
      {children}
    </FsaDbContext.Provider>
  );
}

export { FsaDbContextProvider, useFsaDbContext };
export type { FsaDbContextType };
