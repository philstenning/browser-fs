import { db ,setCurrentRootDirectoryId,setCurrentDirectoryId} from '../'

import { createDragDirectory } from './'
import { createFile } from '../models/files'
import { getFileExtension, bytesToSize } from '../utils'
import { fsaDirectory } from '../models/types'

export default async function dragAddFilesToDirectory(
  files: FileList,
  dirId?: string
) {
  // to save the files we need a directory.
  const directory = await getDirectory(dirId)
  if (!directory) return

  //  fileIds will be added to the directory.fileIds
  const { fileIds } = directory
  for (const file of files) {
    console.log(`${file.name}  ${!!file.type ? file.type : 'unknown type'}`)

    // console.log({ file })
    const { id } = directory
    const tempFile = await createFile(
      {} as FileSystemFileHandle,
      id,
      id,
      'local',
      getFileExtension(file.name),
      file.name,
      '',
      false,
      []
    )
    try {
      const res = await db.files.add({
        ...tempFile,
        blob: file,
        size: bytesToSize(file.size),
      })
      // add id to list for directoryIds
      if (res) {
        fileIds.push(res)
      }
    } catch (error) {
      console.error(`oh no it failed....${typeof file}`)
    }
  }

  const updatedDir: fsaDirectory = {
    ...directory,
    fileIds,
    fileCount: fileIds.length,
  }
  try {
    await db.directories.put(updatedDir)
    await setCurrentDirectoryId(directory.id)
    await setCurrentRootDirectoryId(directory.id)
  } catch (error) {
    console.error(`Error updating Directory: ${directory.name}`)
  }
}

async function getDirectory(dirId?: string) {
  if (!dirId) {
    try {
      const dir = await db.directories
        .where({ isRoot: 'true', name: 'testDrag' })
        .first()
      if (dir) return dir
    } catch (error) {
      console.log(`Error getting Directory for drag and drop ${error}`)
    }

    const dir = await createDragDirectory('testDrag')
    console.log('dd', { dir })
    if (dir) {
      return dir
    } else {
      return false
    }
  } else {
    console.log('have id', dirId)
    const dir = await db.directories.get(dirId)
    if (dir) {
      return dir
    } else {
      return false
    }
  }
}
