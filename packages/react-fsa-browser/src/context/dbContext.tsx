import React, { useState, useContext, createContext, useEffect } from "react";
import {
  createRootDbDirectory,
  db,
  fsaDirectory,
  parseVirtualFileSystemEntry,
  deleteRootDbDirectoryAndFiles,
  initializeDb,
  useLiveQuery
} from "fsa-database";
import { selectRootDirectoryOnLocalDrive, scanLocalDrive } from "fsa-browser";

type FsaDbContextType = {
  currentDbDirectory: fsaDirectory | null;
  setCurrentDbDirectory: (dir: fsaDirectory) => void;
  rootDbDirectories: fsaDirectory[];
  addRootDirectory: () => void;
  deleteRootDirectory: (dir: fsaDirectory) => Promise<boolean>;
  isProcessing: boolean;
  // fileTypes:string[];
  // setFileTypes:(fileTypes:string[])=>void;
};

const FsaDbContext = createContext<FsaDbContextType | null>(null);

function useFsaDbContext() {
  return useContext(FsaDbContext) as FsaDbContextType;
}

type Props = {
  children: React.ReactNode;
  fileExtensionsForApp?:string[]
};

/**
 * 
 * @param param0 
 * @returns 
 */
function FsaDbContextProvider({
  children,
  fileExtensionsForApp = ["stl", "gcode", "3mf", "jpg"],
}: Props) {
  const [currentDbDirectory, _setCurrentDbDirectory] =
    useState<fsaDirectory | null>(null);

  const [rootDbDirectories, setRootDbDirectories] = useState<fsaDirectory[]>(
    []
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const fileTypes = useLiveQuery(()=>db.fileTypes.toArray())
  
  function setCurrentDbDirectory(dir: fsaDirectory) {
    _setCurrentDbDirectory(dir);
  }

  /**
   * Runs at startup of component
   * Loads data into state objects.
   */
  async function getInitialData(): Promise<void> {
    // if this is the first time the db has been opened
    // we need to add some fileTypes
    await initializeDb(fileExtensionsForApp);

    const dirs = await db.directories.where({ isRoot: "true" }).toArray();
    if (dirs.length > 0) {
      setRootDbDirectories(dirs);

      //TODO this needs to be retrieved from a store of some kind.
      _setCurrentDbDirectory(dirs[0]);
    }
  }

  /**
   * Opens the window.showDirectoryPicker and allows
   * user to select a folder to scan for files.
   * once selected it saves the entry to the database and
   * adds it to the state object rootDbDirectories
   * then set it as the currentDirectory
   */
  async function addRootDirectory() {
    const virtualDir = await selectRootDirectoryOnLocalDrive();
    setIsProcessing(true);
    if (virtualDir) {
      const dir = await createRootDbDirectory(virtualDir.handle);
      if (dir) {
        setRootDbDirectories((current) => [...current, dir]);
        _setCurrentDbDirectory(dir);

        // now we need to scan the directory for its folders and files.
        const fileTypeNames = fileTypes?.map(ft=>ft.name) ?? []
        const data = await scanLocalDrive(dir.handle, fileTypeNames, 100);
        // convert the data and save to the database.
        if (dir.id) {
          const f = await parseVirtualFileSystemEntry(data, dir.id, dir.id);
        } else {
          console.error(
            `directory ${dir.name} with an id: ${dir.id ?? "no id given"} `
          );
        }
      }
    }
    setIsProcessing(false);
  }

  /**
   * Delete A single root directory from the database
   * @param dir
   * @returns Promise of boolean
   */
  async function deleteRootDirectory(dir: fsaDirectory) {
    // if you are getting some unexpected things happening
    // check that the event is not propagating to the
    // parent element.
    if (dir.id) {
      const res = await deleteRootDbDirectoryAndFiles(dir);
      if (!res) return false; // something went wrong.

      const filtered = rootDbDirectories.filter((d) => d.id !== dir.id);
      setRootDbDirectories(filtered);

      // if it is the current selected item,
      // select the first of the filtered array
      // or null if it is now empty.
      if (currentDbDirectory?.id === dir.id) {
        if (filtered.length > 0) {
          _setCurrentDbDirectory(filtered[0]);
        }
      }
      if (filtered.length === 0) {
        _setCurrentDbDirectory(null);
      }
    }

    return false;
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <FsaDbContext.Provider
      value={{
        currentDbDirectory,
        setCurrentDbDirectory,
        rootDbDirectories,
        addRootDirectory,
        deleteRootDirectory,
        isProcessing,
      }}
    >
      {children}
    </FsaDbContext.Provider>
  );
}

export { FsaDbContextProvider, useFsaDbContext };
export type { FsaDbContextType };
