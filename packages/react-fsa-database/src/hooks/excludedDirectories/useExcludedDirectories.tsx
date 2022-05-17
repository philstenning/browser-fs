import { useState, useEffect } from 'react'
import {
  addExcludedDirectoryName,
  deleteExcludedDirectoryName,
  db,
  useLiveQuery,
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
