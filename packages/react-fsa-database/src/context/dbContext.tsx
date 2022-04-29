import React, { useState, useContext, createContext, useEffect } from "react";
import { db, initializeDatabase, fsaState, useLiveQuery,initialDbState } from "fsa-database";

type FsaDbContextType = {
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
  const [dbState, setDbState] = useState<fsaState>(initialDbState);
  const currentDbState = useLiveQuery(() => db.state.toCollection().last());

  const saveState = async (state: fsaState) => {
    delete state.id;
    await db.state.add(state);
  };

  function setCurrentDirectoryId(idOrNull: string | null) {
    if (dbState.currentDirectoryId === idOrNull) return;
    saveState({ ...dbState, currentDirectoryId: idOrNull });
  }
  function setCurrentRootDirectoryId(idOrNull: string | null) {
    // only update if changed.
    if (dbState.currentRootDirectoryId === idOrNull) return;
    saveState({ ...dbState, currentRootDirectoryId: idOrNull });
  }
  function setCurrentFileId(idOrNull: string | null) {
    if (dbState.currentFileId === idOrNull) return;
    saveState({ ...dbState, currentFileId: idOrNull });
  }
  function setCurrentCollectionId(idOrNull: string | null) {
    if (dbState.currentCollectionId === idOrNull) return;
    saveState({ ...dbState, currentCollectionId: idOrNull });
  }




  
  /** 
   * if this is the first time the db has been opened
   *  we need to add some fileTypes 
   **/
  async function getInitialData(): Promise<void> {
    await initializeDatabase(fileExtensionsForApp);

  }

  // run at start up 
  useEffect(() => {
    getInitialData();
  }, []);  

  useEffect(() => {
    if (currentDbState) {
      setDbState(currentDbState);
    }
  }, [currentDbState]);

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
