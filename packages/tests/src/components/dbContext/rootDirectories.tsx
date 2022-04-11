import { useRootDirectories, useFsaDbContext } from "react-fsa-browser";
import styles from "./rootDirectories.module.css";
const RootDirectories = () => {
  const { isScanning, rootDirectories, addRootDirectory } =
    useRootDirectories();
    const {dbState, setCurrentRootDirectory} = useFsaDbContext()
  return (
    <div>
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir) => (
            <li className={dbState.currentRootDirectory===dir.id?styles.active:''}  key={dir.id} onClick={()=>setCurrentRootDirectory(dir)}>
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
