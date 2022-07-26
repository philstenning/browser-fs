import { fsaState } from '../types'
import { db } from '../../db/setup'
import { initialDbState } from '../state/initialState'

/**
 * looks at the db to find the last used
 * root dir then set it as currentRootDir
 * and currentDir
 * @category Root Directories
 */
export default async function selectPreviouslySelectedRootDir() {
  // if there is  one  or zero left .
  try {
    const rootDirs = await db.directories
      .where('isRoot')
      .equals('true')
      .toArray()
    // console.log(`there are ${rootDirs.length} left`);

    const count = rootDirs.length
    if (count <= 1) {
      const state = await db.state.toCollection().last()
      if (state) {
        delete state.id
        if (count === 1) {
          const { rootId } = rootDirs[0]
          state.currentDirectoryId = rootId
          state.currentRootDirectoryId = rootId
          // console.log("selected last remaining root Dir ");
        } else {
          state.currentDirectoryId = initialDbState.currentDirectoryId
          state.currentRootDirectoryId = initialDbState.currentRootDirectoryId
          state.currentFileId = initialDbState.currentFileId
          // console.log("No rootDirs left. ");
        }
        await db.state.add(state)
        return
      }
    }
  } catch (error) {
    console.error(`Error selecting only other Root Directory\n${error}`)
  }

  try {
    const states = await db.state.orderBy(':id').reverse().limit(200).toArray()

    if (!states.length) return
    // this is the current state object.
    const { currentRootDirectoryId } = states[0]
    for (const state of states) {
      if (state.currentRootDirectoryId !== currentRootDirectoryId) {
        // check if dir exists;
        if (state.currentRootDirectoryId) {
          const dir = await db.directories.get(state.currentRootDirectoryId)
          if (!dir) continue
        }

        // create a new state from the current state object
        // setting the current root and dir to the rootId.

        const newState: fsaState = {
          ...states[0],
          currentRootDirectoryId: state.currentRootDirectoryId,
          currentDirectoryId: state.currentRootDirectoryId
        }
        // remove the id before adding it.
        delete newState.id
        await db.state.put(newState)
        // console.log(
        //   "selected last used root Dir ",
        //   state.currentRootDirectoryId,
        //   { currentRootDirectoryId }
        // );
        return
      }
    }
  } catch (error) {
    console.error(`Error selecting a previous Root Directory\n${error}`)
  }
}
