import { db, fsaFile, useLiveQuery, updateFile } from 'fsa-database'

export interface IDuplicateFiles {
  id: number
  name: string
  count: number
  fileIds: string[]
}

const unHideAllForFileName = async (fileName: string, rootId: string = '') => {
  const files = await db.files.where('name').equals(fileName).toArray()
  const updatedFiles: fsaFile[] = []
  if (rootId === '') {
    files.forEach((f) => updatedFiles.push({ ...f, hidden: 'false' }))
  } else {
    files
      .filter((f) => f.rootId === rootId)
      .forEach((f) => updatedFiles.push({ ...f, hidden: 'false' }))
  }
  await db.files.bulkPut(updatedFiles)
}

export function useFindDuplicateFiles(showHidden = false, rootId = '') {
  const duplicateFiles =
    useLiveQuery(async () => {
      let files: fsaFile[] = []
      // if we pass in a root id
      // filter only that directory
      if (rootId === '') {
        files = await db.files.orderBy('name').toArray()
      } else {
        files = await db.files.where({ rootId }).toArray()
      }

      if (showHidden) files = files.filter((f) => f.hidden === 'false')
      // reduce the files to distinct names only
      const distinctNames = new Set(files.map((n) => n.name))
      // create an array of new objects with a count field & ids
      const objectWithCount: IDuplicateFiles[] = Array.from(distinctNames).map(
        (n, index) => ({
          id: index,
          name: n,
          count: files.filter((f) => f.name === n).length,
          fileIds: files.filter((f) => f.name === n).map((f) => f.id),
        })
      )
      // finally only return the new object where we have duplicate files names .
      return objectWithCount.filter((f) => f.count >= 2)
    }, [rootId, showHidden]) ?? []

  const hideFile = async (file: fsaFile) => {
    const hasSaved = await updateFile({ ...file, hidden: 'false' })
    return hasSaved
  }

  const unHideFile = async (file: fsaFile) => {
    const hasUpdated = await updateFile({ ...file, hidden: 'true' })
    return hasUpdated
  }

  const toggleHidden = async (file: fsaFile) => {
    const hasToggled = await updateFile({
      ...file,
      hidden: file.hidden === 'true' ? 'false' : 'true',
    })
    return hasToggled
  }

  return {
    duplicateFiles,
    hideFile,
    toggleHidden,
    unHideFile,
    unHideAllForFileName,
  }
}
