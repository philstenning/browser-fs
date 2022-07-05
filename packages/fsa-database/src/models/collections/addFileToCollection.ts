import { fsaCollection, fsaFile, fsaCollectionFile } from '../types'
import findLastUsedCollectionOrCreatNew from '@collections/findLastUsedCollectionOrCreatNew'
import putCollectionAndFile from './putCollectionAndFile'
import getFileExtension from '@utils/getFileExtension'
import getFileNameWithoutExtension from '@utils/getFileNameWithoutExtension'
import createUniqueNameForFile from '@files/createUniqueNameForFile'

export default async function addFileToCollection(
  file: fsaFile,
  collection?: fsaCollection
) {
  if (!file.id) return false
  // if we don't pass in a collection
  // try and retrieve one from the state.
  if (!collection) {
    const col = await findLastUsedCollectionOrCreatNew()
    if (col) {
      collection = col
    } else return
  }

  const uniqueFileName = await createUniqueNameForFile(file)
  const uniqueNamedFile: fsaFile = { ...file, uniqueName: uniqueFileName }

  // create file
  const collectionFile: fsaCollectionFile =
    createCollectionFile(uniqueNamedFile)

  // check if file with same id exists already
  for (const f of collection.files) {
    if (f.fileId === collectionFile.fileId) {
      // console.log(`This file is already in the collection. ${f.name}`)
      return true
    }
  }

  // check for same name and rename if it does
  // collectionFile.name = checkIfFileWithSameNameExists(file.name, collection);

  // increment all current file orders
  collection.files.map((f) => ({ ...f, order: f.order++ }))
  // now add at order 0
  collection.files.push(collectionFile)
  uniqueNamedFile.userCollectionIds.push(collection.id)
  return await putCollectionAndFile(collection, uniqueNamedFile)
}

function createCollectionFile(file: fsaFile): fsaCollectionFile {
  return {
    fileId: file.id,
    added: Date.now(),
    order: 0,
    name: file.uniqueName ?? file.name,
  }
}

/* now has been made obsolete by  createUniqueNameForFile()  */
function checkIfFileWithSameNameExists(
  fileName: string,
  collection: fsaCollection,
  substituteString: string = '__duplicate'
) {
  let counter = 0
  let fileNameWithoutExt = getFileNameWithoutExtension(fileName)
  const ext = getFileExtension(fileName)

  // match all occurrences of the string
  const test = `${substituteString}\([1-9]\)+`
  const re = new RegExp(test, 'gi')

  const match = fileNameWithoutExt.match(re)

  // if it already has a suffix remove it.
  if (match) {
    const withoutIndex = fileNameWithoutExt.lastIndexOf(
      match[match?.length - 1]
    )
    fileNameWithoutExt = fileNameWithoutExt.substring(0, withoutIndex)
  }

  let tempName = fileNameWithoutExt
  while (
    collection.files.filter(
      (f) => f.name.substring(0, f.name.indexOf('.')) === tempName
    ).length > 0
  ) {
    counter++
    tempName = `${fileNameWithoutExt}__duplicate(${counter})`
  }
  return `${tempName}.${ext}`
}
