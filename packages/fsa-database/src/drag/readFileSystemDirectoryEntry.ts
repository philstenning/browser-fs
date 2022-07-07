import getFileTypeNames from '../models/fileTypes/getFileTypeNames'
import getFileExtension from '../utils/getFileExtension'
import { fsaFile } from '../models/types'
import getFile from './getFile'
import createDragFile from './createDragFile'

type readFileSystemDirectoryEntryProp = {
  files: fsaFile[]
  directories: FileSystemDirectoryEntry[]
}

/**
 * Reads the directory  passed in  and returns an object containing
 * the containing files and directories.
 * @param {FileSystemDirectoryEntry} directory
 * @param {string} parentId
 * @param {string} rootId
 * @returns {fsaFile[]} A promise that when resolved returns an array of fsaFiles
 */
const readFileSystemDirectoryEntry = (
  directory: FileSystemDirectoryEntry,
  parentId: string,
  rootId: string
  ) => {
    return new Promise<readFileSystemDirectoryEntryProp>((resolve) => {
      const reader = directory.createReader()
      
      const files: fsaFile[] = []
      const directories: FileSystemDirectoryEntry[] = []
      
      reader.readEntries(async (entry) => {
      const filetypeNames = await getFileTypeNames()
      for (const item of entry) {
        if (item.isFile) {
          // check for the file extensions that we want
          if (
            !filetypeNames?.includes(
              getFileExtension(item.name).toLocaleLowerCase()
            )
          ) {
            continue
          }
          const file = await getFile(item as FileSystemFileEntry)
          const createdFile = await createDragFile(parentId, rootId, file)
          if (createdFile) files.push(createdFile)
        }
        if (item.isDirectory) {
          directories.push(item as FileSystemDirectoryEntry)
        }
      }
      resolve({ files, directories })
    })
  })
}

export default readFileSystemDirectoryEntry
