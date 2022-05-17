import { db, useLiveQuery } from 'fsa-database'

/**
 * Returns a array of fileType names
 */
function useFileTypesNames() {
  const fileTypesNames =
    useLiveQuery(() =>
      db.fileTypes.toArray().then((ft) => ft.map((ft2) => ft2.name))
    ) ?? []

  return fileTypesNames
}

export default useFileTypesNames
