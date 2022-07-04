
import type {RootDirOrderType, VirtualRootDirectoryType} from './types'

import { saveVirtualRootDirectory } from './save'
import {
  deleteAllVirtualRootDirectories,
  deleteVirtualRootDirectory
} from './delete'
import { updateVirtualRootDirectory } from './update'
import {
  getAllVirtualRootDirectories,
  getAllVirtualRootDirectoriesAndCheckPermissions,
  orderDirectoriesByDate
} from './get'


export type { RootDirOrderType, VirtualRootDirectoryType }
export {
  deleteAllVirtualRootDirectories,
  deleteVirtualRootDirectory,
  getAllVirtualRootDirectories,
  getAllVirtualRootDirectoriesAndCheckPermissions,
  orderDirectoriesByDate,
  saveVirtualRootDirectory,
  updateVirtualRootDirectory
}
