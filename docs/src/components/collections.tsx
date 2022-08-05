import {
  useCollections,
  useFsaDbContext
} from '@philstenning/react-fsa-database'

const Collections = () => {
  const { collections, addCollection } = useCollections()
  const {
    dbState: { currentCollectionId },
    setCurrentCollectionId
  } = useFsaDbContext()
  return (
    <div>
      <h4>Collections</h4>
      <button onClick={() => addCollection('collection')}>New</button>
      <ul>
        {collections.map((c) => (
          <li 
          className={currentCollectionId===c.id?'selected':''}
          key={c.id} onClick={() => setCurrentCollectionId(c.id)}  >
            {c.name} { `(${c.files.length})`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Collections
