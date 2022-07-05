import { db, fsaFile } from 'fsa-database'
import { useLiveQuery } from 'dexie-react-hooks'
function useDirectoryFiles() {
  const directoryFiles =
    useLiveQuery<fsaFile[]>(async () => {
      const state = await db.state.toCollection().last()
      if (!state || !state.currentDirectoryId) return []
      const res = await db.files
        .where({ parentId: state.currentDirectoryId, hidden: 'false' })
        .toArray()
      return res
    }, []) ?? []
  return { directoryFiles }
}

export default useDirectoryFiles
