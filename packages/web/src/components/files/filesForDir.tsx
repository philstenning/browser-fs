import { fsaFile } from "fsa-database";
import React from "react";
import { useDirectoryFiles, useFsaDbContext } from "react-fsa-database";

function FilesForDir() {
  const { dbState, setCurrentFileId } = useFsaDbContext();
  const { directoryFiles } = useDirectoryFiles();

  const handleSetCurrentFile = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    file: fsaFile
  ) => {

    e.stopPropagation()
    setCurrentFileId(file.id)
  };
  return (
    <div>
     <h5> Files for current Directory </h5> 
      {directoryFiles&&  directoryFiles.map((file) => (
        <li
        className={dbState.currentFileId===file.id?'active':''}
        onClick={(e) => handleSetCurrentFile(e, file)} key={file.id}>
          {file.name}
        </li>
      ))}
    </div>
  );
}

export default FilesForDir;
