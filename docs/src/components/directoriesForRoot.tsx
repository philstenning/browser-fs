import {
  useDirectories,
  useFsaDbContext
} from '@philstenning/react-fsa-database'

const DirectoriesForRoot = () => {
  const { directoriesForRootDirectory } = useDirectories()
  const { dbState, setCurrentDirectoryId } = useFsaDbContext()
  //  console.log(directoriesForRootDirectory)
  return (
    <div className="directories-for-root">
      <h4>Directories</h4>
      <ul>
        {directoriesForRootDirectory?.map((d) => (
        
         <li
            key={d.id}
            onClick={() => setCurrentDirectoryId(d.id)}
            className={dbState.currentDirectoryId === d.id ? 'selected' : ''}
          >
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DirectoriesForRoot
