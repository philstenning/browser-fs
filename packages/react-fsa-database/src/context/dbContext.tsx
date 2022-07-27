/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  db,
  initializeDatabase,
  fsaState,
  initialDbState,
  setCurrentCollectionId as setColId,
  setCurrentDirectoryId as setDirId,
  setCurrentFileId as setFileId,
  setCurrentRootDirectoryId as setRoodId,
} from '@philstenning/fsa-database'
import FsaDbContext from './FsaDbContext'

export type FsaDbContextType = {
  dbState: fsaState
  setCurrentDirectoryId: (id: string) => void
  setCurrentRootDirectoryId: (id: string) => void
  setCurrentCollectionId: (id: string) => void
  setCurrentFileId: (id: string) => void
  isScanning: boolean
}

export type FsaDbContextProviderProps = {
  /**
   * Any file extension that your app wants to scan for.
   * The format can be '.ext' or 'ext'
   * @defaultValue ['stl', 'gcode', '3mf', 'jpg']
   */
  fileExtensionsForApp?: string[]
}

/**
 * @category Context Provider
 */
export default function FsaDbContextProvider({
  children,
  fileExtensionsForApp = ['stl', 'gcode', '3mf', 'jpg'],
}: React.PropsWithChildren<FsaDbContextProviderProps>) {
  const [dbState, setDbState] = useState<fsaState>(initialDbState)
  const [isScanning, setIsReScanning] = useState(false)

  const currentState = useLiveQuery(() => db.state.toCollection().last())
  // const settings = useLiveQuery(() => db.settings.toCollection().last())
  // const { scanInterval } = settings;

  /**
   * if this is the first time the db has been opened
   *  we need to add some fileTypes
   **/
  async function getInitialData(): Promise<void> {
    await initializeDatabase(fileExtensionsForApp)
  }

  /* use to set the scanning state. */
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

  // set re-scan timer.
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

  const setCurrentRootDirectoryId = useCallback((id: string) => {
    setRoodId(id)
  }, [])
  const setCurrentCollectionId = useCallback((id: string) => {
    setColId(id)
  }, [])
  const setCurrentDirectoryId = useCallback((id: string) => {
    setDirId(id)
  }, [])
  const setCurrentFileId = useCallback((id: string) => {
    setFileId(id)
  }, [])

  const state = useMemo(
    () => ({
      dbState,
      setCurrentCollectionId,
      setCurrentDirectoryId,
      setCurrentFileId,
      setCurrentRootDirectoryId,
      isScanning,
    }),
    [dbState, isScanning]
  )

  return <FsaDbContext.Provider value={state}>{children}</FsaDbContext.Provider>
}
