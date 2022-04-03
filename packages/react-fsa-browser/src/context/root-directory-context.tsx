import React, { useState, useEffect, useContext, createContext } from "react";
import {
  VirtualRootDirectoryType,
  deleteAllVirtualRootDirectories,
  deleteVirtualRootDirectory,
  getAllVirtualRootDirectories,
  checkPermissionsOfHandle,
  selectRootDirectoryOnLocalDrive,
  saveVirtualRootDirectory,
  updateVirtualRootDirectory,
  orderDirectoriesByDate,
  RootDirOrderType,
} from "fsa-browser";

type RootDirectoryContextType = {
  getNewRootDirectory: () => Promise<VirtualRootDirectoryType | null>;
  updateRootDirectory: (
    virtualRootDir: VirtualRootDirectoryType
  ) => Promise<boolean>;
  deleteRootDirectory: (
    virtualRootDir: VirtualRootDirectoryType
  ) => Promise<boolean>;
  deleteAllRootDirectories: () => Promise<boolean>;
  getPermissionForVirtualRootDir: (
    virtualRootDir: VirtualRootDirectoryType
  ) => Promise<boolean>;
  rootDirectories: VirtualRootDirectoryType[];
  orderByDate: (order: RootDirOrderType) => void;
  rootDirectoryOrder: RootDirOrderType;
};

const RootDirectoryContext = createContext<RootDirectoryContextType | null>(
  null
);

function useRootDirectoryContext() {
  return useContext(RootDirectoryContext) as RootDirectoryContextType;
}

type RootProps = {
  children: React.ReactNode;
  InitialRootDirectoryOrder: RootDirOrderType;
};

/**
 *
 * @param param0
 * @returns
 */
const RootDirectoryProvider = ({
  children,
  InitialRootDirectoryOrder = "desc",
}: RootProps) => {
  const [rootDirectories, setRootDirectories] = useState<
    VirtualRootDirectoryType[]
  >([]);

  const [rootDirectoryOrder, seRootDirOrder] = useState<RootDirOrderType>(
    InitialRootDirectoryOrder
  );

  async function getNewRootDirectory() {
    const result = await selectRootDirectoryOnLocalDrive();
    if (result) {
      const hasSaved = await saveVirtualRootDirectory(result);
      if (hasSaved) {
        const ordered = orderDirectoriesByDate(
          [...rootDirectories, result],
          rootDirectoryOrder
        );
        setRootDirectories(ordered);
      }
      return result;
    }
    return null;
  }

  async function updateRootDirectory(virtualRootDir: VirtualRootDirectoryType) {
    const hasUpdated = await updateVirtualRootDirectory(virtualRootDir);
    if (hasUpdated) {
      const filtered = rootDirectories.filter(
        (dir) => dir.id !== virtualRootDir.id
      );
      const ordered = orderDirectoriesByDate(
        [...filtered, virtualRootDir],
        rootDirectoryOrder
      );
      setRootDirectories(ordered);
      return true;
    }
    return false;
  }

  async function deleteRootDirectory(virtualRootDir: VirtualRootDirectoryType) {
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
    virtualRootDir: VirtualRootDirectoryType
  ) {
    const hasPermission = await checkPermissionsOfHandle(virtualRootDir.handle);
    if (hasPermission) {
      const filtered = rootDirectories.filter(
        (dir) => dir.id !== virtualRootDir.id
      );
      virtualRootDir.hasReadPermission = true;

      const ordered = orderDirectoriesByDate(
        [...filtered, virtualRootDir],
        rootDirectoryOrder
      );
      setRootDirectories(ordered);
      return true;
    }
    return false;
  }

  async function getInitialData() {
    const allDirs = await getAllVirtualRootDirectories();
    if (allDirs) {
      const order = orderDirectoriesByDate(allDirs, rootDirectoryOrder);
      setRootDirectories(order);
    }
  }

  const orderByDate = (order: RootDirOrderType) => {
    order === "asc" ? seRootDirOrder("asc") : seRootDirOrder("desc");
    setRootDirectories(orderDirectoriesByDate(rootDirectories, order));
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <RootDirectoryContext.Provider
      value={{
        rootDirectories,
        rootDirectoryOrder,
        deleteAllRootDirectories,
        getNewRootDirectory,
        updateRootDirectory,
        deleteRootDirectory,
        getPermissionForVirtualRootDir,
        orderByDate,
      }}
    >
      {children}
    </RootDirectoryContext.Provider>
  );
};

export { RootDirectoryProvider, useRootDirectoryContext };
export type { RootDirectoryContextType };
