import { createContext } from 'react'
import type { FsaDbContextType } from './dbContext'

const FsaDbContext = createContext<FsaDbContextType | null>(null)

export default FsaDbContext
