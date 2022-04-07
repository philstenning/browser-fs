import { fsaDirectory } from "fsa-database";
import React from "react";
import { useFsaDbContext } from "react-fsa-browser";
import FileTypes from '../components/db-context/file-types'
import FileList from '../components/db-context/dir-list'
const DbProvider = () => {
  const {
    rootDbDirectories,
    currentDbDirectory,
    addRootDirectory,
    setCurrentDbDirectory,
    deleteRootDirectory,
    isProcessing
  } = useFsaDbContext();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    dir: fsaDirectory
  ) => {
    e.stopPropagation();
    deleteRootDirectory(dir);
  };

  return (
    <div>
      <p>Current dir: {currentDbDirectory?.name}</p>
      <div>{isProcessing?'Processing':''}</div>
      <button onClick={addRootDirectory}>Add</button>
      <ul>
        {rootDbDirectories.map((dir, index) => (
          <li key={index} onClick={() => setCurrentDbDirectory(dir)}>
            {dir.name}{" "}
            <button onClick={(e) => handleClick(e, dir)}>Delete</button>
          </li>
        ))}
      </ul>
      <FileTypes/>
      <FileList/>
    </div>
  );
};

export default DbProvider;
