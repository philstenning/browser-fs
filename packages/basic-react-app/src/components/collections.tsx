import { fsaCollection } from 'fsa-database'
import { useState } from 'react'
import { useCollections, useFsaDbContext } from 'react-fsa-database'
import styles from './directories.module.css'

function Collections() {
  const {  collections } = useCollections()
  const { dbState } = useFsaDbContext()
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Collections</h2>
      <ul className={styles.list}>
        {collections.map((col) => (
          <ListItem
            isSelected={dbState.currentCollectionId === col.id}
            col={col}
          />
        ))}
      </ul>
    </div>
  )
}

type Props = {
  col: fsaCollection
  isSelected: boolean
}

const ListItem = ({ col, isSelected }: Props) => {
     const {  updateCollection } = useCollections()
    const [name, setName] = useState(col.name)
  return (
    <li
      key={col.id}
      className={`${styles.listItem} ${isSelected ? 'selected' : ''}`}
    >
        
      <input onBlur={(e)=>updateCollection({...col,name})} className={styles.input} type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
    </li>
  )
}

export default Collections
// TODO:: enable editing from here...