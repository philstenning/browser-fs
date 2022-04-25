import { useState, useEffect } from "react";
import {
  useRootDirectories,
  useFsaDbContext,
  useReScanRootDirectories,
} from "react-fsa-database";

//@ts-ignore
import styles from "./rootDirectories.module.css";

const RootDirectories = () => {
  const [scanning, setScanning] = useState(false);
  const { isScanning, rootDirectories, addRootDirectory } =
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
    <div>
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir) => (
            <li
              className={
                dbState.currentRootDirectoryId === dir.id
                  ? `${styles.active} ${styles.listItem}`
                  : `${styles.listItem}`
              }
              key={dir.id}
              onClick={() => setCurrentRootDirectoryId(dir.id)}
            >
              {" "}
              <span>
                {dir.name}{" "}</span>
                <div className={styles.reScanSpin}>
                  {dir.readPermission === "true" ? "✔️" : ""}
                
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.btnGroup}>
        <button
          // className={isScanning ? "" : styles.isScanning}
          onClick={addRootDirectory}
          disabled={scanning}
        >
          {!scanning ? "Add Root Directory" : "Scanning Drive"}
        </button>
        <button onClick={reScanRootDirectories}>ReScan Root Directories</button>
      </div>
    </div>
  );
};

export default RootDirectories;
