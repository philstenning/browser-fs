import createLegacyFileListItem, {
  LegacyFileListItem,
} from './createLegacyFileListItem'

export type LegacyFileList = LegacyFileListItem[]

function createLegacyFileList(fileList: FileList, rootDirectoryId: string) {
  const legacyFileList: LegacyFileList = []

  // store the most deeply nested directory depth
  let maxDirectoryDepth = 0

  // create list of dirs
  // use Set to make them unique.
  const DirectoryList = new Set<string>()

  // add all fileList items to the legacyFileList
  for (const file of fileList) {
    const legacyFileListItem = createLegacyFileListItem(file, rootDirectoryId)
    legacyFileList.push(legacyFileListItem)
    const { depth, directories } = legacyFileListItem

    if (depth > maxDirectoryDepth) maxDirectoryDepth = depth

    // add all the legacyFileListItem directories, even if they don't
    // have files in them this is needed for directory tree.
    directories.forEach((d) => DirectoryList.add(d))
  }

  return { legacyFileList, DirectoryList, maxDirectoryDepth }
}

export default createLegacyFileList
