import { useFsaDbContext } from '@philstenning/react-fsa-database'

const State = () => {
  const {
    dbState: {
      currentCollectionId,
      currentDirectoryId,
      currentFileId,
      currentRootDirectoryId,
      isScanning
    }
  } = useFsaDbContext()
  return (
    <div className="state">
      <h4>State:</h4>
      <ul>
        <li>collection: {currentCollectionId?.split('-')[0]}</li>
        <li>Root: {currentRootDirectoryId?.split('-')[0]}</li>
        <li>Directory: {currentDirectoryId?.split('-')[0]}</li>
        <li>file: {currentFileId?.split('-')[0]}</li>
        <li>scanning: {isScanning}</li>
      </ul>
    </div>
  )
}

export default State
