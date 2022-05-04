import {db} from '../../'
export async function getExcludedFoldersList(){
    return (await db.excludedFolders.toArray()).map(item=> item.name)
}