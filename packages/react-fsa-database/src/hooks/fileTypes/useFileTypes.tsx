import {
  db,
  fsaFileType,
  addFileType,
  deleteFileType,
} from '@philstenning/fsa-database'
import { useLiveQuery } from 'dexie-react-hooks'

/**
 * @category Hooks
 */
function useFileTypes() {
  const fileTypes = useLiveQuery(() => db.fileTypes.toArray()) ?? []

  const toggleSelectedFileType = (fileType: fsaFileType) => {
    if (fileType.id) {
      db.fileTypes.update(fileType.id, { selected: !fileType.selected })
    }
  }
  const toggleHiddenFileType = (fileType: fsaFileType) => {
    if (fileType.id) {
      db.fileTypes.update(fileType.id, { hidden: !fileType.hidden })
    }
  }

  return {
    fileTypes,
    addFileType,
    toggleSelectedFileType,
    toggleHiddenFileType,
    deleteFileType,
  }
}

export default useFileTypes
