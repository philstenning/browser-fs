import { db } from '../../db'
import { fsaFileType } from '../types'

/**
 * Add a new fileType/extension that you would like to
 * add to the database when scanning the local drive
 * @param {string} name
 * @returns {Promise<number | boolean>} A Promise that resolves to the id of the added record of false
 */
export default async function addFileType(name: string): Promise<number | boolean> {
  if (!name) return false
  const formattedName = name.replace('.', '').trim().toLowerCase()
  
  // prevent same ext being added again
   if (await fileTypeExists(formattedName)) return false

  const fileType: fsaFileType = {
    name: formattedName,
    hidden: false,
    selected: true
  }

  try {
    const id = await db.fileTypes.add(fileType)
    if (id) {
      return id
    }
    return false
  } catch (error) {
    console.error(`Error saving fileType ${error}`)
  }
  return false
}


async function fileTypeExists(name:string){
  try{
    const count =await db.fileTypes.where({name}).count()
    if(!!count) return true
  }catch(error){
    console.error(`Error getting fileType: ${error}`);
  }
  return false
}