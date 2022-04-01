import { useState, useEffect, useContext, createContext, FC } from "react";
import { VirtualRootDirectory } from "../types";

import {
  selectRootDirectoryOnLocalDrive,
  checkPermissionsOfHandle,
} from "../file-system-operations";
import {
  saveVirtualRootDirectory,
  updateVirtualRootDirectory,
  deleteAllVirtualRootDirectories,
  deleteVirtualRootDirectory,
  getAllVirtualRootDirectories,
} from "../virtual-root-directories";

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

const RootDirectoryProvider: FC = ({ children }) => {
  const [rootDirectories, setRootDirectories] = useState<
    VirtualRootDirectory[]
  >([]);

  async function getNewRootDirectory() {
    const result = await selectRootDirectoryOnLocalDrive();
    if (result) {
      const hasSaved = await saveVirtualRootDirectory(result);
      if (hasSaved) {
        setRootDirectories((current) => [...current, result]);
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
      setRootDirectories([...filtered, virtualRootDir]);
      return true;
    }
    return false;
  }

  async function deleteRootDirectory(virtualRootDir: VirtualRootDirectory) {
    const hasDeleted = await deleteVirtualRootDirectory(virtualRootDir);
    if (hasDeleted) {
      const filtered = rootDirectories.filter(
        (dir) => dir.id !== virtualRootDir.id
      );
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
      setRootDirectories([...filtered, virtualRootDir]);
      return true;
    }
    return false;
  }

  async function getInitialData() {
    const allDirs = await getAllVirtualRootDirectories();
    if (allDirs) {
      setRootDirectories(allDirs);
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
