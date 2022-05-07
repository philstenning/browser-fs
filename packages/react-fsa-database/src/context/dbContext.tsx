import React, { useState, useContext, createContext, useEffect } from 'react'
import {
  db,
  initializeDatabase,
  fsaState,
  useLiveQuery,
  initialDbState,
  setCurrentCollectionId,
  setCurrentDirectoryId,
  setCurrentFileId,
  setCurrentRootDirectoryId,
} from 'fsa-database'

export type FsaDbContextType = {
  dbState: fsaState
  setCurrentDirectoryId: (id: string) => void
  setCurrentRootDirectoryId: (id: string) => void
  setCurrentCollectionId: (id: string) => void
  setCurrentFileId: (id: string) => void
  isScanning: boolean
}

const FsaDbContext = createContext<FsaDbContextType | null>(null)

export function useFsaDbContext() {
  return useContext(FsaDbContext) as FsaDbContextType
}

type Props = {
  children: React.ReactNode
  fileExtensionsForApp?: string[]
}

/**
 *
 * @param param0
 * @returns
 */
export function FsaDbContextProvider({
  children,
  fileExtensionsForApp = ['stl', 'gcode', '3mf', 'jpg'],
}: Props) {
  const [dbState, setDbState] = useState<fsaState>(initialDbState)
  const [isScanning, setIsReScanning] = useState(false)

  const currentState = useLiveQuery(() => db.state.toCollection().last())
  // const settings = useLiveQuery(() => db.settings.toCollection().last())
  // const { scanInterval } = settings;

  /**
   *
   * if this is the first time the db has been opened
   *  we need to add some fileTypes
   **/
  async function getInitialData(): Promise<void> {
    await initializeDatabase(fileExtensionsForApp)
  }

  // use to set the scanning state.
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (currentState) {
        if (isScanning !== currentState.isScanning) {
          setIsReScanning(currentState.isScanning)
        }
      }
    }
    return () => {
      isMounted = false
    }
  }, [currentState])

  // run at start up
  useEffect(() => {
    getInitialData()
  }, [])

  useEffect(() => {
    if (
      currentState &&
      !!currentState.currentCollectionId && // handle a null value
      !!currentState.currentFileId // handle a null value
    ) {
      setDbState(currentState)
    }
  }, [currentState])

  //set re-scan timer.
  // useEffect(() => {
  //   if (scanInterval > 0) {
  //     console.log(`rescan set to ${scanInterval} ${scanInterval===1?'min':'mins'}`);
  //     const timer = setInterval(() => {
  //     }, scanInterval * 600);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }else{
  //     console.log('rescan off')
  //   }
  // }, [scanInterval]);

  return (
    <FsaDbContext.Provider
      value={{
        dbState,
        setCurrentCollectionId,
        setCurrentDirectoryId,
        setCurrentFileId,
        setCurrentRootDirectoryId,
        isScanning,
      }}
    >
      {children}
    </FsaDbContext.Provider>
  )
}

// export { FsaDbContextProvider, useFsaDbContext };
// export type { FsaDbContextType };
