import { db, fsaDirectory, fsaFile } from '@philstenning/fsa-database'
import { useLiveQuery } from 'dexie-react-hooks'

/**
 * @category Hooks
 */
function useCurrentDirectory() {

  const currentDirectory = useLiveQuery<fsaDirectory | null>(async () => {
    // get the last entry from the state table.
    const state = await db.state.toCollection().last()
    if (!state) return null
    // find the directory and return it
    const curDir = await db.directories
      .where({ id: state.currentDirectoryId })
      .first()
    if (!!curDir) return curDir
    return null
  })

  const directoryFiles =
    useLiveQuery<fsaFile[]>(async () => {
      const state = await db.state.toCollection().last()
      if (!state || !state.currentDirectoryId) return []
      const res = await db.files
        .where({ parentId: state.currentDirectoryId, hidden: 'false' })
        .toArray()
      return res
    }, []) ?? []
  return { directoryFiles, currentDirectory }
}

export default useCurrentDirectory
