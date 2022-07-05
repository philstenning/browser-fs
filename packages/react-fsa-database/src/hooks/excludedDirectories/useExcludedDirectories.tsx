import { useState, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  addExcludedDirectoryName,
  deleteExcludedDirectoryName,
  db,
  fsaExcludedDirectory,
} from 'fsa-database'

export default function useExcludedDirectories() {
  const [excludedDirectories, setExcludedDirectories] = useState<
    fsaExcludedDirectory[]
  >([])
  const excludedDirs = useLiveQuery(() => db.excludedDirectories.toArray())

  useEffect(() => {
    if (excludedDirs) {
      setExcludedDirectories(excludedDirs)
    }
  }, [excludedDirs])

  return {
    excludedDirectories,
    deleteExcludedDirectoryName,
    addExcludedDirectoryName,
  }
}
