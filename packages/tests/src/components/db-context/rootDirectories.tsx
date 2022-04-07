import { useRootDirectories } from "react-fsa-browser";
import styles from "./rootDirectories.module.css";
const RootDirectories = () => {
  const { isScanning, rootDirectories, addRootDirectory } =
    useRootDirectories();
  return (
    <div>
      <ul>
        {rootDirectories &&
          rootDirectories.map((dir) => (
            <li key={dir.id}>
              {dir.name}
              {isScanning.toString()}
            </li>
          ))}
      </ul>
      <button
        // className={isScanning ? "" : styles.isScanning}
        onClick={addRootDirectory}
        disabled={isScanning}
      >
        Add Root Directory
      </button>
    </div>
  );
};

export default RootDirectories;
