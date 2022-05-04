import { useState, useEffect } from "react";
import {
  db,
  fsaDirectory,
  useLiveQuery,
  deleteRootDirectory,
  rescanRootDirectories,
  addRootDirectory,
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

  return {
    rootDirectories,
    deleteRootDirectory,
    addRootDirectory,
    rescanRootDirectories,
  };
}
