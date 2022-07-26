import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  db,
  fsaDirectory,
  hideDirectoryAndFiles,
  mergeToParentDirectory,
  unMergeDirectories,
  updateDirectory,
} from '@philstenning/fsa-database'
import useFsaDbContext from '../context/useFsaDbContext'

/**
* @category Hooks
 */
function useDirectories() {
  const [showHidden, setShowHidden] = useState(true)
  const { setCurrentDirectoryId } = useFsaDbContext()

  const directoriesForRootDirectory = useLiveQuery(async () => {
    const currentRoot = await db.state.toCollection().last()
    if (currentRoot && currentRoot.currentRootDirectoryId) {
      if (showHidden) {
        const res = await db.directories
          .where('rootId')
          .equals(currentRoot.currentRootDirectoryId)
          .toArray()
        return res
      }
      const res = (
        await db.directories
          .where('rootId')
          .equals(currentRoot.currentRootDirectoryId)
          .toArray()
      ).filter((d) => d.hidden === 'false')
      return res
    }
    // if we get here return an empty array
    return []
  }, [showHidden])

  const hideDirectory = hideDirectoryAndFiles

  const unHideDirectory = (directory: fsaDirectory) =>
    hideDirectoryAndFiles(directory, 'false')

  const toggleHidden = () => {
    setShowHidden((cur) => !cur)
  }

  const mergeToRootDirectory = () => {
    throw new Error('not implemented error')
  }
  return {
    directoriesForRootDirectory,
    updateDirectory,
    setCurrentDirectoryId,
    hideDirectory,
    unHideDirectory,
    toggleHidden,
    mergeToParentDirectory,
    mergeToRootDirectory,
    unMergeDirectories,
  }
}

export default useDirectories
