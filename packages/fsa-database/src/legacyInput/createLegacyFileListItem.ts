export type LegacyFileListItem = {
  file: File
  path: string
  directories: string[]
  parentId: string
  rootId: string
  depth: number
}

function createLegacyFileListItem(file: File, rootId = '', parentId = '') {
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

export default createLegacyFileListItem
