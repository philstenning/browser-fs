import { useState } from "react";
import {
  db,
  fsaDirectory,
  useLiveQuery,
  hideDirectoryAndFiles,
} from "fsa-database";
import { useFsaDbContext } from "../../context/dbContext";

import { update } from "./update";

import { mergeToParentDir } from "./mergeToParentDir";
import { unMergeDirectories } from "./unMergeDirectories";

function useDirectories() {
  const [showHidden, setShowHidden] = useState(true);
  const { setCurrentDirectoryId } = useFsaDbContext();

  const directoriesForRootDirectory = useLiveQuery(async () => {
    const currentRoot = await db.state.toCollection().last();
    if (currentRoot && currentRoot.currentRootDirectoryId) {
      // const search = showHidden
      //   ? { rootId: currentRoot.currentRootDirectoryId, hidden: "false" }
      //   : { rootId: currentRoot.currentRootDirectoryId };
      if (showHidden) {
        return await db.directories
          .where("rootId")
          .equals(currentRoot.currentRootDirectoryId)
          .toArray();
      }
      return (
        await db.directories
          .where("rootId")
          .equals(currentRoot.currentRootDirectoryId)
          .toArray()
      ).filter((d) => d.hidden === "false");
    }
  }, [showHidden]);

  const hideDirectory = hideDirectoryAndFiles;

  const unHideDirectory = (directory: fsaDirectory) =>
    hideDirectoryAndFiles(directory, "false");

  const updateDirectory = update;

  const toggleHidden = () => {
    setShowHidden((cur) => !cur);
  };
  const mergeToParentDirectory = async (directory: fsaDirectory) => {
    await mergeToParentDir(directory);
  };
  const mergeToRootDirectory = () => {
    throw new Error("not implemented error");
  };
  return {
    directoriesForRootDirectory,
    updateDirectory,
    setCurrentDirectoryId,
    hideDirectory,
    unHideDirectory,
    toggleHidden,
    mergeToParentDirectory,
    mergeToRootDirectory,
    unMergeDirectories,
  };
}

export { useDirectories };
