import { db } from "../../db/setup";
import { removeFileFromCollection } from "./removeFileFromCollection";

export async function removeAllFilesFromCollection(collectionId: number) {
  const collection = await db.userCollections.get(collectionId);
  if (!collection) return;
  
  const files = await db.files.bulkGet(collection.files.map(f=>f.fileId));

  // remove collection id from each file
  // then put bach in the db
  await db.transaction('rw',db.userCollections, db.files,async ()=>{
      
            try{
                for (const file of files) {
                    if (!file) return;
                    const fileIds = file.userCollectionIds.filter((n) => n !== collection.id);
                    file.userCollectionIds = fileIds;
                    await db.files.put(file);
                }
                //
                collection.files = [];
                await db.userCollections.put(collection);
            }catch(err){
                console.error('error removing files from collection.')
            }
})

  
}
