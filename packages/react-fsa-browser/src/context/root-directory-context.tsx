import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from "react";
import {
  VirtualRootDirectory,
  deleteAllVirtualRootDirectories,
  deleteVirtualRootDirectory,
  getAllVirtualRootDirectories,
  checkPermissionsOfHandle,
  selectRootDirectoryOnLocalDrive,
  saveVirtualRootDirectory,
  updateVirtualRootDirectory,
  orderDirectoriesByDate,
} from "fsa-browser";

type RootDirectoryContextType = {
  getNewRootDirectory: () => Promise<VirtualRootDirectory | null>;
  updateRootDirectory: (
    virtualRootDir: VirtualRootDirectory
  ) => Promise<boolean>;
  deleteRootDirectory: (
    virtualRootDir: VirtualRootDirectory
  ) => Promise<boolean>;
  deleteAllRootDirectories: () => Promise<boolean>;
  getPermissionForVirtualRootDir: (
    virtualRootDir: VirtualRootDirectory
  ) => Promise<boolean>;
  rootDirectories: VirtualRootDirectory[];
};

const RootDirectoryContext = createContext<RootDirectoryContextType | null>(
  null
);

function useRootDirectoryContext() {
  return useContext(RootDirectoryContext) as RootDirectoryContextType;
}

type RootProps = {
  children: React.ReactChildren;
  rootDirectoryOrder: RootDirOrderType;
};
type RootDirOrderType = "asc" | "desc";
/**
 * 
 * @param param0 
 * @returns 
 */
const RootDirectoryProvider = ({
  children,
  rootDirectoryOrder = "desc",
}: RootProps) => {
  const [rootDirectories, setRootDirectories] = useState<
    VirtualRootDirectory[]
  >([]);

  const [rootDirOrder, seRootDirOrder] =
    useState<RootDirOrderType>(rootDirectoryOrder);

  async function getNewRootDirectory() {
    const result = await selectRootDirectoryOnLocalDrive();
    if (result) {
      const hasSaved = await saveVirtualRootDirectory(result);
      if (hasSaved) {
        const ordered = orderDirectoriesByDate(
          [...rootDirectories, result],
          rootDirOrder
        );
        setRootDirectories(ordered);
      }
      return result;
    }
    return null;
  }

  async function updateRootDirectory(virtualRootDir: VirtualRootDirectory) {
    const hasUpdated = await updateVirtualRootDirectory(virtualRootDir);
    if (hasUpdated) {
      const filtered = rootDirectories.filter(
        (dir) => dir.id !== virtualRootDir.id
      );
      const ordered = orderDirectoriesByDate(
        [...filtered, virtualRootDir],
        rootDirOrder
      );
      setRootDirectories(ordered);
      return true;
    }
    return false;
  }

  async function deleteRootDirectory(virtualRootDir: VirtualRootDirectory) {
    console.log("started");
    const hasDeleted = await deleteVirtualRootDirectory(virtualRootDir);
    console.log({ hasDeleted });
    if (hasDeleted) {
      const filtered = rootDirectories.filter(
        (dir) => dir.id !== virtualRootDir.id
      );
      console.log({ filtered }, filtered.length);
      setRootDirectories(filtered);
      return true;
    }
    return false;
  }
  async function deleteAllRootDirectories() {
    const hasDeleted = await deleteAllVirtualRootDirectories();
    if (hasDeleted) return true;
    return false;
  }

  async function getPermissionForVirtualRootDir(
    virtualRootDir: VirtualRootDirectory
  ) {
    const hasPermission = await checkPermissionsOfHandle(virtualRootDir.handle);
    if (hasPermission) {
      const filtered = rootDirectories.filter(
        (dir) => dir.id !== virtualRootDir.id
      );
      virtualRootDir.hasReadPermission = true;

      const ordered = orderDirectoriesByDate(
        [...filtered, virtualRootDir],
        rootDirOrder
      );
      setRootDirectories(ordered);
      return true;
    }
    return false;
  }

  async function getInitialData() {
    const allDirs = await getAllVirtualRootDirectories();
    if (allDirs) {
      const order = orderDirectoriesByDate(allDirs, rootDirOrder);
      setRootDirectories(order);
    }
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <RootDirectoryContext.Provider
      value={{
        rootDirectories,
        deleteAllRootDirectories,
        getNewRootDirectory,
        updateRootDirectory,
        deleteRootDirectory,
        getPermissionForVirtualRootDir,
      }}
    >
      {children}
    </RootDirectoryContext.Provider>
  );
};

export { RootDirectoryProvider, useRootDirectoryContext };
export type { RootDirectoryContextType };
