import {db} from './setup'
import {Folder} from './models/Folder'
import {VirtualFileSystemEntry} from 'fsa-browser'

export async function createRootDirectoryInDatabase(
  virtualFileSystemEntry:VirtualFileSystemEntry
) {
    const {handle,kind,name,path,entries} = virtualFileSystemEntry
    if(handle.kind ==='directory'){
        console.log(handle)
        const folder = new Folder(name,handle,true,0,0,'')

        console.log({folder})
        const id = await db.folders.add(folder)
        
        const f = await db.folders.where({id}).first()
        console.log({f})
       

      console.log({id})
      return id
    }
    return null
}


