import { fsaFile } from 'fsa-database'
import {useCollections, useFsaDbContext} from 'react-fsa-database'
//@ts-ignore
import styles from "./currentCollectionItems.module.css";
function CollectionItems() {
    const {currentCollectionItems, removeFileFromCollection,} = useCollections()
   const {dbState,setCurrentFile} = useFsaDbContext()

    const removeItem=(e:React.MouseEvent<HTMLButtonElement> ,file:fsaFile)=>{
       e.stopPropagation()
       removeFileFromCollection(file)
    }
  return (
    <div>
        <h4>Collection Items</h4>
        <ul>
            {currentCollectionItems.map(item=>(
                <li
                key={item.id}
                className={dbState.currentFile===item.id?'active':''}
                onClick={()=>setCurrentFile(item)}
                >{item.order} {item.name} <button onClick={(e)=>removeItem(e,item)}>Remove</button></li>
            ))}
        </ul>
    </div>
  )
}

export default CollectionItems