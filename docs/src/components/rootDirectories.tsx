import {
  useRootDirectories,
  useFsaDbContext
} from '@philstenning/react-fsa-database'

function RootDirectories() {
  const { addRootDirectory, rootDirectories } = useRootDirectories()
  const { dbState } = useFsaDbContext()
  return (
    <>
      <button onClick={addRootDirectory}>Add</button>
      <ul>
        {rootDirectories.map((rd) => (
          <li
            className={
              dbState.currentRootDirectoryId === rd.id ? 'selected' : ''
            }
            key={rd.id}
          >
            {rd.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default RootDirectories
