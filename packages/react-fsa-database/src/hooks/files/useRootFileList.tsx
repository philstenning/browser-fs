import { db, useLiveQuery } from 'fsa-database'

function useRootFileList(
  filterBySelectedFileTypes: boolean = true,
  filterByRootDirectory: boolean = true
) {
  function filterByTypeAndRootDir() {
    const list = useLiveQuery(async () => {
      const ft = await db.fileTypes.toArray()

      const fileTypeNames = [...ft.filter((t) => t.selected).map((t) => t.name)]
      const files = await db.files.where('type').anyOf(fileTypeNames).toArray()

      const state = await db.state.toCollection().last()
      if (!state) return []
      // return files.toArray()
      return files.filter((f) => f.rootId === state.currentRootDirectoryId)
    })
    return list ?? []
  }

  function filterByRootDirOnly() {
    const list = useLiveQuery(async () => {
      const state = await db.state.toCollection().last()
      if (!state?.currentRootDirectoryId) return []
      const files = await db.files
        .where('rootId')
        .equals(state?.currentRootDirectoryId)
        .toArray()
      return files
    })
    return list ?? []
  }

  function filterFileTypesOnly() {
    const list =
      useLiveQuery(async () => {
        const ft = await db.fileTypes.toArray()
        return (
          db.files
            .where('type')
            // filter the fileTypes then return only the name
            .anyOf(...ft.filter((t) => t.selected).map((t) => t.name))
            .toArray()
        )
      }) ?? []

    return list
  }

  // true, true
  if (filterBySelectedFileTypes && filterByRootDirectory) {
    return filterByTypeAndRootDir()
  }

  // false, false
  if (!filterBySelectedFileTypes && !filterByRootDirectory) {
    return useLiveQuery(() => db.files.toArray().then((res) => res)) ?? []
  }

  // false, true
  if (filterByRootDirectory) return filterByRootDirOnly()
  // true, false
  if (filterBySelectedFileTypes) return filterFileTypesOnly()
  throw new Error('we should not be here...')
}

export { useRootFileList }
