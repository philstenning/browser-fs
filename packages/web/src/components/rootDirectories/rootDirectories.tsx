import { useState, useEffect } from "react";
import {
  useRootDirectories,
  useFsaDbContext,
  useReScanRootDirectories,
} from "react-fsa-database";
import { ImSpinner6 } from "react-icons/im";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { fsaDirectory } from "fsa-database";
import { BiTrash } from "react-icons/bi";
//@ts-ignore
import styles from "./rootDirectories.module.css";

const RootDirectories = () => {
  const [scanning, setScanning] = useState(false);
  const { isScanning, rootDirectories, addRootDirectory, deleteRootDirectory } =
    useRootDirectories();
  const { isReScanning, reScanRootDirectories } = useReScanRootDirectories();
  const { dbState, setCurrentRootDirectoryId } = useFsaDbContext();

  useEffect(() => {
    if (isReScanning || isScanning) {
      setScanning(true);
    } else {
      setScanning(false);
    }
  }, [isScanning, isReScanning]);

  return (
    <div data-testid="rootDirectories">
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir,index) => (
            <li
              className={
                dbState.currentRootDirectoryId === dir.id
                  ? `${styles.active} ${styles.listItem}`
                  : `${styles.listItem}`
              }
              key={dir.id}
              onClick={() => setCurrentRootDirectoryId(dir.id)}
            >
              <button
                className={styles.btnTrash}
                onClick={() => deleteRootDirectory(dir)}
                data-testid={`rootDirectoriesListItem-${index}_btnDelete`}
              >
                <BiTrash />
              </button>
              <span>{dir.name} </span>
              <ScanningContent dir={dir} scanning={scanning} />
            </li>
          ))}
      </ul>
      <div className={styles.btnGroup}>
        <button
          onClick={addRootDirectory}
          disabled={scanning}
        >
          {!scanning ? "Add Root Directory" : "Scanning Drive"}
        </button>
        <button disabled={scanning} onClick={reScanRootDirectories}>
          ReScan Root Directories
        </button>
      </div>
    </div>
  );
};

export default RootDirectories;

type Props = {
  dir: fsaDirectory;
  scanning: boolean;
};

function ScanningContent({ dir, scanning }: Props) {
  const started = dir.isScanning;
  const finished = dir.scanFinished;
  if (dir.readPermission === "false") return <span>❌</span>;

  if (scanning) {
    if (started && !finished)
      return (
        <span className={styles.onScanSpin}>
          <ImSpinner6 />
        </span>
      );
    if (!finished) {
      return (
        <span className={styles.content}>
          {" "}
          <IoEllipsisHorizontalSharp />
        </span>
      );
    }
  }

  // if (started && finished) return "✔️";
  // if(scanning )return <span><ImSpinner6 /> pending...</span> ;
  return <span>✔️</span>;
}
