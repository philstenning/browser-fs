import FileTypes from "../components/files/fileTypes";
import FileList from "../components/files/filesForRootDir";
import RootDir from "../components/rootDirectories/rootDirectories";
import CollectionList from "../components/collections/collectionsList";
import CurrentState from "../components/currentDbState/currentDbState";
import CollectionItems from "../components/collections/currentCollectionItems";
import DirectoriesForRootDir from "../components/directories/directoriesForRootDir";
import FilesForDir from '../components/files/filesForDir'
import DuplicateFiles from "../components/files/duplicateFiles";
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
        <div>

        <DuplicateFiles/>
        <FileList />
        </div>
        <div>
          <CollectionList />
          <CollectionItems />
          <DirectoriesForRootDir />
          <FilesForDir />
        </div>
      </div>
    </div>
  );
};

export default DbProvider;
