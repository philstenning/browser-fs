import FileTypes from "../components/db-context/file-types";
import FileList from "../components/db-context/dir-list";
import RootDir from "../components/db-context/rootDirectories";
import styles from "./DbProvider.module.css";
import CollectionList from "../components/collections/collectionsList";

const DbProvider = () => {
  return (
    <div>
      <RootDir />
      <FileTypes />
      <div className={styles.lists}>
        <FileList />
        <CollectionList/>
      </div>
    </div>
  );
};

export default DbProvider;
