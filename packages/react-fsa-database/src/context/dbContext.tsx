import React, { useState, useContext, createContext, useEffect } from "react";
import {
  db,
  initializeDatabase,
  fsaState,
  useLiveQuery,
  initialDbState,
  createInitialSetting,
} from "fsa-database";

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
  const settings =
    useLiveQuery(() => db.settings.toCollection().last()) ??
    createInitialSetting();
  const { scanInterval } = settings;
  const saveState = async (state: fsaState) => {
    delete state.id;
    await db.state.add(state);
  };

  const setCurrentDirectoryId = async (idOrNull: string | null) => {
    if (dbState.currentDirectoryId === idOrNull) return;
    await saveState({ ...dbState, currentDirectoryId: idOrNull });
  };
  const setCurrentRootDirectoryId = async (idOrNull: string | null) => {
    // only update if changed.
    if (dbState.currentRootDirectoryId === idOrNull) return;
    await saveState({ ...dbState, currentRootDirectoryId: idOrNull });
  };
  const setCurrentFileId = async (idOrNull: string | null) => {
    if (dbState.currentFileId === idOrNull) return;
    await saveState({ ...dbState, currentFileId: idOrNull });
  };
  const setCurrentCollectionId = async (idOrNull: string | null) => {
    if (dbState.currentCollectionId === idOrNull) return;
    await saveState({ ...dbState, currentCollectionId: idOrNull });
  };

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

  //set re-scan timer.
  useEffect(() => {
    if (scanInterval > 0) {
      console.log(`rescan set to ${scanInterval} ${scanInterval===1?'min':'mins'}`);
      const timer = setInterval(() => {
      }, scanInterval * 600);
      return () => {
        clearInterval(timer);
      };
    }else{
      console.log('rescan off')
    }
  }, [scanInterval]);

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
