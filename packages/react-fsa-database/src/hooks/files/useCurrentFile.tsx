import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@philstenning/fsa-database'

/**
 * @category Hooks
 */
export default function useCurrentFile() {
  const file = useLiveQuery(async () => {
    const state = await db.state.toCollection().last()
    if (state && !!state.currentFileId) {
      try {
        return await db.files.get(state.currentFileId)
      } catch (error) {
        console.error(`error getting current file ${error}`)
      }
    }
    return null
  })
  return file
}
