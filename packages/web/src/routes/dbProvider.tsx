import FileTypes from "../components/dbContext/fileTypes";
import FileList from "../components/files/filesForRootDir";
import RootDir from "../components/dbContext/rootDirectories";
import CollectionList from "../components/collections/collectionsList";
import CurrentState from "../components/currentDbState/currentDbState";
import CollectionItems from "../components/collections/currentCollectionItems";
import DirectoriesForRootDir from "../components/directories/directoriesForRootDir";
import FilesForDir from '../components/files/filesForDir'

//@ts-ignore // don't know why but vscode ts can't find it???
import styles from './dbProvider.module.css'
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
          <CollectionItems />
          <DirectoriesForRootDir/>
          <FilesForDir/>
        </div>
      </div>
    </div>
  );
};

export default DbProvider;
