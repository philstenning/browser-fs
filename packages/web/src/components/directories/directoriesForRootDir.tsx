import { fsaDirectory } from "fsa-database";
import React from "react";
import { useFsaDbContext, useDirectories } from "react-fsa-database";

const DirectoriesForRootDir = () => {
  const { dbState } = useFsaDbContext();
  const {
    directoriesForRootDirectory,
    setCurrentDirectoryId,
    unHideDirectory,
    hideDirectory,
    toggleHidden,
    mergeToParentDirectory,
    unMergeDirectories,
  } = useDirectories();

  const hideDir = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    directory: fsaDirectory
  ) => {
    e.stopPropagation();

    if (directory.hidden === "false") {
      await hideDirectory(directory);
      return;
    }
    await unHideDirectory(directory);
  };

  const mergeParent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    directory: fsaDirectory
  ) => {
    e.stopPropagation();
    mergeToParentDirectory(directory);
  };
  const unMergeParent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    directory: fsaDirectory
  ) => {
    e.stopPropagation();
    unMergeDirectories(directory);
  };

  return (
    <div>
      <h4>
        Directories For RootDir (files{" "}
        {directoriesForRootDirectory &&
          directoriesForRootDirectory.reduce(
            (previous, current) => previous + current.fileCount,
            0
          )}
        )<button onClick={toggleHidden}>toggle</button>
      </h4>
      <ul>
        {directoriesForRootDirectory?.map(
          (dir) =>
            dir.fileCount > 0 && (
              // list Item
              <li
                className={
                  dbState.currentDirectoryId === dir.id ? "active" : ""
                }
                onClick={() => setCurrentDirectoryId(dir.id)}
                key={dir.id}
              >
                {dir.name} ({dir.fileCount}){" "}
                <button onClick={(e) => hideDir(e, dir)}>
                  {dir.hidden === "false" ? "hide" : "show"}
                </button>{" "}
                {dir.isRoot === "false" && (
                  <button onClick={(e) => mergeParent(e, dir)}>
                    merge parent
                  </button>
                )}
                {dir.isRoot === "true" && (
                  <button onClick={(e) => unMergeParent(e, dir)}>
                    UnMergeAll
                  </button>
                )}
              </li>

              //  end of list Item
            )
        )}
      </ul>
    </div>
  );
};

export default DirectoriesForRootDir;

// function ListItem(
//   dbState: fsaState,
//   dir: fsaDirectory,
//   setCurrentDirectoryId: (idOrNull: string) => void,
//   hideDir: (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     directory: fsaDirectory
//   ) => Promise<void>,
//   mergeParent: (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     directory: fsaDirectory
//   ) => Promise<void>
// ): JSX.Element {
//   return (
//     <li
//       className={dbState.currentDirectoryId === dir.id ? "active" : ""}
//       onClick={() => setCurrentDirectoryId(dir.id)}
//       key={dir.id}
//     >
//       {dir.name} ({dir.fileCount}){" "}
//       <button onClick={(e) => hideDir(e, dir)}>
//         {dir.hidden === "false" ? "hide" : "show"}
//       </button>{" "}
//       <button onClick={(e) => mergeParent(e, dir)}>merge parent</button>
//     </li>
//   );
// }