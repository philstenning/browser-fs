import {
  useRootDirectories,
  useFsaDbContext
  
} from '@philstenning/react-fsa-database'

function RootDirectories() {
  const { addRootDirectory, rootDirectories } = useRootDirectories()
  const { dbState:{currentRootDirectoryId} } = useFsaDbContext()
  return (
    <div>
    <h3>Root Directories</h3>
      <button onClick={addRootDirectory}>Add</button>
      <ul>
        {rootDirectories.map((rd) => (
          <li
            className={
              currentRootDirectoryId === rd.id ? 'selected' : ''
            }
            key={rd.id}
          >
            {rd.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RootDirectories
