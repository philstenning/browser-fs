import {useCollections, useFsaDbContext} from 'react-fsa-browser'

function CollectionItems() {
    const {currentCollectionItems} = useCollections()
   const {dbState,setCurrentFile} = useFsaDbContext()
  return (
    <div>
        <h4>Collection Items</h4>
        <ul>
            {currentCollectionItems.map(item=>(
                <li
                key={item.id}
                className={dbState.currentFile===item.id?'active':''}
                onClick={()=>setCurrentFile(item)}
                >{item.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default CollectionItems