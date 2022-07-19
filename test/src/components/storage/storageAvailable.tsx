import { useEffect, useState } from 'react'
import { checkBrowserStorage, fsaBrowserStorage } from 'fsa-database'
import {useFsaDbContext} from 'react-fsa-database'


function StorageAvailable() {
  const [storage, setStorage] = useState<fsaBrowserStorage>({
    percentageUsed: 0,
    remaining: 0,
    isAvailable: false,
    remainingFormatted: 'N/A'
  })
  const {isScanning,dbState} = useFsaDbContext()

  useEffect(() => {
    console.log('checking browser api')
    checkBrowserStorage().then((res) => {
      setStorage(res)
    })
  }, [isScanning , dbState.currentRootDirectoryId])

  if (!storage.isAvailable)
    return <p>storage api not available in this browser</p>
  return (
    <div>
      <p>
        you have used {storage.percentageUsed}% of your available storage
      </p>
      <p>you have {storage.remainingFormatted} remaining</p>
    </div>
  )
}

export default StorageAvailable
