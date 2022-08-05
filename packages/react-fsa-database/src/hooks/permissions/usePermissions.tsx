import {
  checkHandlePermission,
  fsaDirectory,
  fsaFile,
  db,
} from '@philstenning/fsa-database'

/**
 * @category Hooks
 *
 * @example
 * ```tsx
 * const {checkPermission, checkAllRootDirectoryPermissions} = usePermissions()
 * 
 * checkAllRootDirectoryPermissions()
 * ```
 */
function usePermissions() {
  /**
   *
   * Checks the permission of the root Directory for the passed fsaFile/fsaDirectory object,
   * it requests the permission if it has not been granted previously.
   * NOTE: This must be attached to a user interaction like a
   * button click or will fail
   */
  function checkPermission(fileOrDirectory: fsaFile | fsaDirectory) {
    checkHandlePermission(fileOrDirectory)
  }

  /**
   * Checks all the root Directories permissions and requests them if they have
   * not been granted.
   * NOTE: This must be attached to a user interaction like a
   * button click or will fail.
   */
  const checkAllRootDirectoryPermissions = async () => {
    const rootDirs = await db.directories.where({ isRoot: 'true' }).toArray()
    rootDirs.forEach((d) => checkHandlePermission(d))
  }

  return { checkPermission, checkAllRootDirectoryPermissions }
}

export default usePermissions
