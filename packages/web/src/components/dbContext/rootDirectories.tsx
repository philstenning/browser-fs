import { useRootDirectories, useFsaDbContext } from "react-fsa-database";
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
      <button
        // className={isScanning ? "" : styles.isScanning}
        onClick={addRootDirectory}
        disabled={isScanning}
      >
        {!isScanning?'Add Root Directory':'Scanning Drive'}
      </button>
    </div>
  );
};

export default RootDirectories;
