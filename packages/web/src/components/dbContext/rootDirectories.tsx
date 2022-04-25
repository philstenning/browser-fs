import { useRootDirectories, useFsaDbContext } from "react-fsa-database";
import {reScanRootDirectories} from 'fsa-database'
//@ts-ignore
import styles from "./rootDirectories.module.css";
const RootDirectories = () => {
  const { isScanning, rootDirectories, addRootDirectory } =
    useRootDirectories();
    const {dbState, setCurrentRootDirectoryId} = useFsaDbContext()
  return (
    <div>
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir) => (
            <li className={dbState.currentRootDirectoryId===dir.id?styles.active:''}  key={dir.id} onClick={()=>setCurrentRootDirectoryId(dir.id)}>
              {dir.name}
            
            </li>
          ))}
      </ul>
      <div className={styles.btnGroup}>

      <button
        // className={isScanning ? "" : styles.isScanning}
        onClick={addRootDirectory}
        disabled={isScanning}
        >
        {!isScanning?'Add Root Directory':'Scanning Drive'}
      </button>
      <button onClick={reScanRootDirectories}>ReScan Root Directories</button>
        </div>
    </div>
  );
};

export default RootDirectories;
