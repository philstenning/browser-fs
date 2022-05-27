import { fsaCollection } from 'fsa-database'
import { useEffect, useState } from 'react'
import { useCollections, useFsaDbContext } from 'react-fsa-database'
import styles from './directories.module.css'

function Collections() {
  const { collections, addCollection } = useCollections()
  const { dbState, setCurrentCollectionId } = useFsaDbContext()
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Collections</h2>
      <button
      className={styles.btn}
      onClick={() => addCollection('My Collection')}>Add</button>
      <ul className={styles.list}>
        {collections.map((col) => (
          <ListItem
           key={col.id}
            select={setCurrentCollectionId}
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
  select: (id: string) => void
}

const ListItem = ({ col, isSelected, select }: Props) => {
  const { updateCollection } = useCollections()
  const [displayName, setDisplayName] = useState(col.name || '')
  const [isDisabled, setIsDisabled] = useState(true)
  const { name } = col
  useEffect(() => {
    console.log(name)
  }, [name])
  const handleBlur = () => {
    updateCollection({ ...col, name: displayName })
    setIsDisabled(true)
  }

  return (
    <li
    
      className={`${styles.listItem} ${isSelected ? 'selected' : ''}`}
      onClick={() => select(col.id)}
      onDoubleClick={() => setIsDisabled(false)}
    >
      <input
        onBlur={handleBlur}
        className={styles.input}
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        disabled={isDisabled}
      />
    </li>
  )
}

export default Collections
// TODO:: enable editing from here...
