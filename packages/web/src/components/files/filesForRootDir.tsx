import {
  useRootFileList,
  useCollections,
  useFsaDbContext,
} from "react-fsa-database";
import { fsaFile } from "fsa-database";
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

  const checkPerm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: fsaFile
  ) => {
    e.stopPropagation();
    checkPermissionsOfHandle(file.handle)
      .then((res) => {
        console.log(`file ${file.path} has permission`);
        //  checkPerm2(e,file)
      })
      .catch((err) => console.error("first ", err));
  };

  const listStyles = (file: fsaFile) => {
    return `${dbState.currentFileId === file.id ? "active" : ""} ${
      file.hidden === "true" ? "hidden" : ""
    }`;
  };

  return (
    <div className={styles.container}>
      <h3>File List ({list.length})</h3>
      <ul>
        {list &&
          list.map((file, index) => (
            <li
              className={listStyles(file)}
              onClick={(e) => handleClick(e, file)}
              key={index}
            >
              {file.name} {file.hidden}
              <button onClick={(e) => checkPerm(e, file)}>check</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FilesForRootDir;
