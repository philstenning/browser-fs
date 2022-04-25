import { fsaDirectory } from "fsa-database";
import React, { useState, useEffect } from "react";
import { useFsaDbContext, useDirectories } from "react-fsa-database";
import { createBrotliDecompress } from "zlib";
//@ts-ignore
import styles from "./directoriesForRootDir.module.css";
const DirectoriesForRootDir = () => {
  const [filter, setFilter] = useState("");
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
  const [filteredDirs, setFilteredDirs] = useState<fsaDirectory[]>([]);

  useEffect(() => {
    if (directoriesForRootDirectory && filter.length) {
      const result = directoriesForRootDirectory.filter((d) =>
        d.name.includes(filter) && d.depth < 2
      );
      setFilteredDirs(result);
    } else {
      setFilteredDirs(directoriesForRootDirectory);
    }
  }, [directoriesForRootDirectory, filter]);

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
          Directories For RootDir (files {filteredDirs && filteredDirs.length})
        </h4>
        <div className={styles.hideButtons}>

          <button data-testid="dirForRootId_btn" onClick={toggleHidden}>
            Toggle Hidden
          </button>
          <button data-test-id={`dfr_btn_unHideAll`}>UnHide All</button>
        </div>
        <input
          className={styles.filter}
          type="search"
          autoComplete="off"
          name="filter"
          id="dfr_filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ul>
          {filteredDirs?.map((dir, index) => (
            // list Item
            <li
              data-test-id={`dfr_listItem_${index}`}
              className={dbState.currentDirectoryId === dir.id ? "active" : ""}
              onClick={() => setCurrentDirectoryId(dir.id)}
              key={dir.id}
            >
              {" "}
              {index} {dir.name} ({dir.fileCount}){" "}
              <button
                data-test-id={`dfr_btn_hide_${index}`}
                onClick={(e) => hideDir(e, dir)}
              >
                {dir.hidden === "false" ? "hide" : "show"}
              </button>{" "}
              {dir.isRoot === "false" && (
                <button
                  data-test-id={`dfr_btn_merge_${index}`}
                  onClick={(e) => mergeParent(e, dir)}
                >
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
          ))}
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
