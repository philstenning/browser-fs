export type LegacyFileListItem = {
  file: File
  path: string
  directories: string[]
  parentId: string
  rootId: string
  depth: number
}

export type LegacyFileList = LegacyFileListItem[]

export default function createLegacyFileListItem(file: File, rootId = '', parentId = '') {
  const pathArray = file.webkitRelativePath.split('/')

  // if in root directory = '/'
  const path =
    pathArray.length > 1
      ? pathArray.slice(0, pathArray.length - 1).join('/')
      : '/'

  // create a list of directories for this file
  const copyPath = [...pathArray.slice(0, pathArray.length - 1)] //  use copy don't mutate pathArray
  const allDirs: string[] = []
  for (let index = copyPath.length; index > 0; index--) {
    allDirs.push(copyPath.join('/'))
    // each iteration remove one item.
    copyPath.pop()
  }

  const tempFileListItem: LegacyFileListItem = {
    file: file,
    parentId,
    rootId,
    directories: allDirs,
    path,
    depth: pathArray.length,
  }
  return tempFileListItem
}


function createLegacyFileList(fileList: FileList) {
  // add all fileList items to the legacyFileList
  for (const file of fileList) {
    const legacyFileListItem = createLegacyFileListItem(file, rootDir.id)
    legacyFileList.push(legacyFileListItem)
    const { depth, directories } = legacyFileListItem

    if (depth > maxDirectoryDepth) maxDirectoryDepth = depth

    // add all the legacyFileListItem directories, even if they don't
    // have files in them this is needed for directory tree.
    directories.forEach((d) => DirectoryList.add(d))
  }
}





