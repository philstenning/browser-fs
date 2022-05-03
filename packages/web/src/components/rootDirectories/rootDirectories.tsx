import { useState, useEffect, useRef } from "react";
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
  const ref = useRef(null);
  const { isReScanning, reScanRootDirectories } = useReScanRootDirectories();
  const { dbState, setCurrentRootDirectoryId } = useFsaDbContext();

  useEffect(() => {
    //  clean up if unmounted.
    let isSubscribed = true;
    if (isSubscribed) {
      if (isReScanning || isScanning) {
        setScanning(true);
      } else {
        setScanning(false);
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [isScanning, isReScanning]);

  return (
    <div data-testid="rootDirectories">
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir, index) => (
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
                data-cy={`deleteRootDir_${dir.name}`}
              >
                <BiTrash />
              </button>
              <span data-cy={`selectRootDir_${dir.name}`}>{dir.name} </span>
              <ScanningContent dir={dir} scanning={scanning} index={index} />
            </li>
          ))}
      </ul>
      <div className={styles.btnGroup}>
        <button onClick={addRootDirectory} disabled={scanning}>
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
  index: number;
};

function ScanningContent({ dir, scanning, index }: Props) {
  const started = dir.isScanning;
  const finished = dir.scanFinished;
  if (dir.readPermission === "false")
    return <span data-cy={`rootDirHasPermission-${index}`}>❌</span>;

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
  return <span data-cy={`rootDirHasPermission-${index}`}>✔️</span>;
}
