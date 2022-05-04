import { useState, useEffect } from "react";
import {
  db,
  fsaDirectory,
  useLiveQuery,
  deleteRootDirectoryAndFiles,
  rootDirHasFilesInCollections,
  addRootDirectory
} from "fsa-database";

export function useRootDirectories() {


  const [rootDirectories, setRootDirectories] = useState<fsaDirectory[]>([]);

  const rootDirectoriesQuery = useLiveQuery(() =>
    db.directories
      .orderBy("created")
      .filter((f) => f.isRoot === "true")
      .toArray()
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (rootDirectoriesQuery) {
        setRootDirectories(rootDirectoriesQuery);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [rootDirectoriesQuery]);

  const deleteRootDirectory = async (dir: fsaDirectory) => {
    const hasCollections = await rootDirHasFilesInCollections(dir.id);
    if (hasCollections) {
      console.error("TODO: have collections don't delete");
      // return;
    }

    deleteRootDirectoryAndFiles(dir);
  };
  return { rootDirectories, deleteRootDirectory, addRootDirectory };
}
