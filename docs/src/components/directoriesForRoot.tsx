import {
  useDirectories,
  useFsaDbContext
} from '@philstenning/react-fsa-database'

const DirectoriesForRoot = () => {
    const {directoriesForRootDirectory} = useDirectories( )
    const {dbState, setCurrentDirectoryId} = useFsaDbContext()

  return (
    <div className='root-dirs'>
    <ul>{directoriesForRootDirectory?.map(d=>(
        <li key={d.id}
        onClick={()=>setCurrentDirectoryId(d.id)}
        className={dbState.currentDirectoryId ===d.id?'selected':''}
        >{d.name}</li>
        ))}</ul>
        </div>
  )
}

export default DirectoriesForRoot