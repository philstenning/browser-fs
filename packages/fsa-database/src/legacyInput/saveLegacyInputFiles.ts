import { db } from '../db'
import { fsaDirectory } from 'models/types'
import createLegacyDirectory from './createLegacyDirectory'
import createLegacyFile from './createLegacyFile'
type TempDir = {
  name: string
  path: string
  depth: number
}

type DirItem = {
  name: string
  path: string
  depth: number
  dir: fsaDirectory
}
export default async function saveLegacyInputFiles(fileList: FileList | null) {
  if (!fileList || fileList.length === 0) return
  console.log('starting')
  // any file will have the same root dir name but go with the  first.
  const rootDirName = fileList[0].webkitRelativePath.split('/')[0]

  // create the root dir.
  const rootDir = await createLegacyDirectory(rootDirName, rootDirName)
  if (!rootDir) return
  // create list of dirs
  // use Set to make them unique.
  const dirs = new Set<string>()
  let maxDepth = 0
  for (const file of fileList) {
    // create file for each file of fileList
    const path = file.webkitRelativePath.split('/')
    path.pop() // remove file name

    if (path.length > maxDepth) {
      maxDepth = path.length
    }
    // add all directories even if they don't have files.
    for (let index = path.length; index > 0; index--) {
      dirs.add(path.join('/'))
      path.pop()
    }
  }

  const tempDirs: TempDir[] = []
  for (const dir of dirs) {
    const split = dir.split('/')
    tempDirs.push({
      name: split.at(-1) ?? 'noName__error',
      depth: split.length,
      path: dir,
    })
  }
  // return

  const dirItems: DirItem[] = []
  dirItems.push({
    depth: 0,
    dir: rootDir,
    name: rootDirName,
    path: rootDirName,
  })

  for (let index = 2; index <= maxDepth; index++) {
    const result = tempDirs.filter((f) => f.depth === index)
    for (const directory of result) {
      const splitPath = directory.path.split('/')
      splitPath.pop()
      const parentPath = splitPath.join('/')
      // if there is no parent then it is the root dir.
      const parentDirId =
        dirItems.filter((d) => d.path === parentPath)[0]?.dir.id ?? rootDir.id
      const newDir = await createLegacyDirectory(
        directory.name,
        directory.path,
        rootDir.id,
        parentDirId,
        index
      )
      if (!!newDir) {
        dirItems.push({ ...directory, dir: newDir })
      }
    }
  }

  for (let index = 1; index <= maxDepth; index++) {
    console.log(`\n- ${index}`)
    dirItems
      .filter((i) => i.depth === index)
      .forEach((i) => console.log(`${i.path} ${i.dir.id}`))
  }
  console.log(`\n\n -------`)
  for (const file of fileList) {
    const path = file.webkitRelativePath.replace(`/${file.name}`, '')
    const parent = dirItems.find((i) => i.path === path)

    // console.log(`${path}  ${file.webkitRelativePath}`)
    createLegacyFile(parent?.dir.id ?? 'error', rootDir.id, file, path, true)
  }

  // count files for dir
  for (const dir of dirItems) {
    const filesForDirectory = await db.files
      .where({ parent: dir.dir.id })
      .toArray()
    dir.dir.fileCount = filesForDirectory.length
    //TODO from here...
  }
}

// create array to hold id's of files
// get blob
// save to database
// return
