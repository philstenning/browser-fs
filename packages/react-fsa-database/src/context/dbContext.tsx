import React, { useState, useContext, createContext, useEffect } from "react";
import {
  db,
  initializeDatabase,
  fsaState,
  useLiveQuery,
  initialDbState,
  createInitialSetting,

  setCurrentCollectionId,
  setCurrentDirectoryId,
  setCurrentFileId,
  setCurrentRootDirectoryId
} from "fsa-database";


type FsaDbContextType = {
  dbState: fsaState;
  setCurrentDirectoryId: (id: string ) => void;
  setCurrentRootDirectoryId: (id: string ) => void;
  setCurrentCollectionId: (id: string ) => void;
  setCurrentFileId: (id: string) => void;
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
