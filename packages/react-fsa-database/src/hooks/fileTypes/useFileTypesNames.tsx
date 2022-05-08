import { db, useLiveQuery } from 'fsa-database'

/**
 *
 * @returns array of fileType Names string[]
 */
function useFileTypesNames() {
  const fileTypesNames =
    useLiveQuery(() =>
      db.fileTypes.toArray().then((ft) => ft.map((ft2) => ft2.name))
    ) ?? []

  return fileTypesNames
}

export { useFileTypesNames }
