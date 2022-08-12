import {
  useRootDirectories,
  useFsaDbContext, usePermissions, fsaDirectory
} from '@philstenning/react-fsa-database'

function RootDirectories() {
  const { addRootDirectory, rootDirectories } = useRootDirectories()
  const {
    dbState: { currentRootDirectoryId },
    setCurrentRootDirectoryId, setCurrentDirectoryId
  } = useFsaDbContext()
  const {checkPermission} = usePermissions()

  const classNames = (id: string, hasReadPermission: string) => {
    const selected = currentRootDirectoryId === id ? 'selected' : ''
    const hasPermission = hasReadPermission === 'false' ? 'has-permission' : ''
    return `${selected} ${hasPermission}`
  }
   
  const handleSelect=(dir:fsaDirectory)=>{
      checkPermission(dir)
      // setCurrentDirectoryId(dir.id)
      setCurrentRootDirectoryId(dir.id)

  }


  return (
    <div>
      <h3>Root Directories</h3>
      <button onClick={addRootDirectory}>Add</button>
      <ul>
        {rootDirectories.map((rd) => (
          <li
            className={classNames(rd.id, rd.readPermission)}
            key={rd.id}
            onClick={() => handleSelect(rd)}
          >
            {rd.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RootDirectories
