import {
  useRootFileList,
  useCollections,
  useFsaDbContext,
} from "react-fsa-database";
import { db, fsaFile } from "fsa-database";
//@ts-ignore
import styles from "./filesForRootDir.module.css";

import { checkPermissionsOfHandle } from "fsa-browser";

function FilesForRootDir() {
  const { dbState, setCurrentFileId } = useFsaDbContext();
  const list = useRootFileList(true, true);
  const { addFileToCollection } = useCollections();

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    file: fsaFile
  ) => {
    e.stopPropagation();
    await addFileToCollection(file);
    setCurrentFileId(file.id);
  };

  const checkPerm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: fsaFile
  ) => {
    e.stopPropagation();
    //TODO: Move to library

    const res = await checkPermissionsOfHandle(file.handle);
    if (res) {
      const dirs = await db.directories
        .where("rootId")
        .equals(file.rootId)
        .toArray();
      dirs.forEach((d) => (d.readPermission = "true"));
      await db.directories.bulkPut(dirs);
    }
  };

  const listStyles = (file: fsaFile) => {
    return `${dbState.currentFileId === file.id ? "active" : ""} ${
      file.hidden === "true" ? "hidden" : ""
    }`;
  };

  return (
    <div className={styles.container} data-testid="filesForRootDir">
      <h3>File List ({list.length})</h3>
      <ul data-testid="filesForRootDirList">
        {list &&
          list.map((file, index) => (
            <li
              className={listStyles(file)}
              onClick={(e) => handleClick(e, file)}
              key={index}
              data-testid={`filesForRootDirListItem-${index}`}
            >
              {file.name} {file.hidden}
              <button onClick={(e) => checkPerm(e, file)}>check</button>{" "}
              {file.size}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FilesForRootDir;
