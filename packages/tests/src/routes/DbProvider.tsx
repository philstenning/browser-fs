import FileTypes from "../components/db-context/file-types";
import FileList from "../components/db-context/dir-list";
import RootDir from "../components/db-context/rootDirectories";
import styles from "./DbProvider.module.css";
import CollectionList from "../components/collections/collectionsList";
import CurrentState from '../components/state/currentState'
import CollectionItems from '../components/collections/collectionItems'
const DbProvider = () => {
  return (
    <div>
      <div className={styles.split}>
        <RootDir />
        <CurrentState />
      </div>
      <FileTypes />
      <div className={styles.split}>
        <FileList />
        <div>

        <CollectionList />
        <CollectionItems/>
        </div>
      </div>
    </div>
  );
};

export default DbProvider;
