import React from 'react'
import {useCollections} from 'react-fsa-browser'

function CollectionItems() {
    const {currentCollectionItems} = useCollections()
  return (
    <div>
        <h4>Collection Items</h4>
        <ul>
            {/* {currentCollectionItems.map(file=>(
                <li>{file.name}</li>
            ))} */}
            {currentCollectionItems.map(item=>(
                <li>{item.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default CollectionItems