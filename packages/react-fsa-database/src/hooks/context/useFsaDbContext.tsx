import { useContext } from 'react'
import type { FsaDbContextType } from '../../context/dbContext'
import FsaDbContext from '../../context/FsaDbContext'

function useFsaDbContext() {
  return useContext(FsaDbContext) as FsaDbContextType
}

export default useFsaDbContext
export { FsaDbContext }
