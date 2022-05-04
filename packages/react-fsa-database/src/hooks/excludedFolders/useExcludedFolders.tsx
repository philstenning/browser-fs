import {useState , useEffect} from 'react'
import {
  addExcludedFolderName,
  deleteExcludedFolderName,
  db,
  useLiveQuery,
  fsaExcludedFolder,
} from "fsa-database";

export function useExcludedFolders() {
   const [excludedFolders, setExcludedFolders] = useState<fsaExcludedFolder[]>(
     []
   );
  const _excludedFolders = useLiveQuery(() => db.excludedFolders.toArray());

  useEffect(()=>{
    
    if(_excludedFolders){
        setExcludedFolders(_excludedFolders)
    }

  },[_excludedFolders])


  return { excludedFolders, deleteExcludedFolderName, addExcludedFolderName };
}
