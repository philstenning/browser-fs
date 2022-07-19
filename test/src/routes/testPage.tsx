import React from 'react'
import FileTypes from "../components/files/fileTypes";
import FileList from "../components/files/filesForRootDir";
import RootDir from "../components/rootDirectories/rootDirectories";
import CollectionList from "../components/collections/collectionsList";
import CurrentState from "../components/currentDbState/currentDbState";
import CollectionItems from "../components/collections/currentCollectionItems";
import DirectoriesForRootDir from "../components/directories/directoriesForRootDir";
import FilesForDir from "../components/files/filesForDir";
import DuplicateFiles from "../components/files/duplicateFiles";
import CurrentFile from '../components/files/currentFile'
import StorageAvailable from '../components/storage/storageAvailable'

//@ts-ignore // don't know why but vscode ts can't find it???
import styles from "./testPage.module.css";
const TestPage = () => {
  return (
    <div data-testid="testPage">
      <div className={styles.split} data-testid="dbProviderSplit__left">
        <div>

        <RootDir />
        <StorageAvailable/>
        </div>
        <CurrentState />
      </div>
      <div className={styles.split}>
        <FileTypes />
        <CurrentFile/>
      </div>
      <div className={styles.split} data-testid="dbProviderSplit__right">
        <div>
          <FileList />
          <DuplicateFiles />
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

export default TestPage;
