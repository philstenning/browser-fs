import { useState, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  db,
  fsaDirectory,
  deleteRootDirectory,
  rescanRootDirectories,
  selectRootDirectory as addRootDirectory,
} from 'fsa-database'

export default function mergeToParentDirectory() {
  const [rootDirectories, setRootDirectories] = useState<fsaDirectory[]>([])

  const rootDirectoriesQuery = useLiveQuery(() =>
    db.directories
      .orderBy('created')
      .filter((f) => f.isRoot === 'true')
      .toArray()
  )

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (rootDirectoriesQuery) {
        setRootDirectories(rootDirectoriesQuery)
      }
    }
    return () => {
      isMounted = false
    }
  }, [rootDirectoriesQuery])

  return {
    rootDirectories,
    deleteRootDirectory,
    addRootDirectory,
    rescanRootDirectories,
  }
}
