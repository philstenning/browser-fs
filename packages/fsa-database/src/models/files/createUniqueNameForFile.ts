import { db } from '../..'
import { fsaFile } from '../types'
import { getFileNameWithoutExtension, getFileExtension } from '../../utils'


/**
 * Creates a unique name for the a file in the database.
 * this is used across collections and only need to
 * be run when the file is added to the collection.
 * this prevents name collisions when saving to disk
 * and makes it easier to see what file is being used.
 *
 * @param {fsaFile} file
 * @returns {string} Unique File name
 */
export default async function createUniqueNameForFile(file: fsaFile): Promise<string> {
  const { name, id } = file
  // we have already given it one exit
  if (!!file.uniqueName) {
    // console.log('1️⃣ 1111   we have already given it one')
    return file.uniqueName
  }

  // see if the name is unique
  // first get an array of files with they same fileName.
  const filesWithSameName = await db.files.where({ name }).toArray()

  // filter them to see how many have a uniqueName prop.
  const filesWithOutOutUniqueNames = filesWithSameName.filter(
    (f) => !f.uniqueName
  )

  // first file with a given name will match here
  if (filesWithSameName.length === filesWithOutOutUniqueNames.length) {
    // console.log(`2️⃣ ${file.name}`)
    return file.name
  }

  //create a Set() of either the uniqueName or if missing use the name
  const uNames = new Set()
  for (const f of filesWithSameName) {
    const uniqueName = f.uniqueName !== 'false' ? f.uniqueName : null
    const tName = uniqueName ?? f.name
    uNames.add(getFileNameWithoutExtension(tName))
  }

  // convert to array
  const d = Array.from(uNames)

  let counter = 0
  const nameWithoutExt = getFileNameWithoutExtension(name)

  // look for when the array don't include the computed fileName.
  while (true) {
    counter++
    const uniqueName = `${nameWithoutExt}__duplicate(${counter})`
    if (!d.includes(uniqueName)) {
      break
    }
    console.log('in ', uniqueName)
  }

  // we now have the unique file name.
  const newUniqueName = `${nameWithoutExt}__duplicate(${counter}).${getFileExtension(
    name
  )}` 

  // console.log(`3️⃣ needs adding ${newUniqueName}`)
  return newUniqueName
}
