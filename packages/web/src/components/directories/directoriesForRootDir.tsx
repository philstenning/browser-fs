import { fsaDirectory } from "fsa-database";
import React from "react";
import { useFsaDbContext, useDirectories } from "react-fsa-database";

const DirectoriesForRootDir = () => {
  const { directoriesForRootDirectory, setCurrentDirectoryId,unHideDirectory, hideDirectory ,toggleHidden} =
    useDirectories();
    
    const hideDir =async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        directory:fsaDirectory) => {
            e.stopPropagation()

            if(directory.hidden==='false'){

                await hideDirectory(directory)
                return
            }
            await unHideDirectory(directory);
        };

  return (
    <div>
      <h4>Directories For RootDir <button onClick={toggleHidden}>toggle</button></h4>
      <ul>
        {directoriesForRootDirectory?.map((dir) => (
          <li onClick={() => setCurrentDirectoryId(dir.id)} key={dir.id}>
            {dir.name} {dir.hidden} <button onClick={e=>hideDir(e,dir)}>{dir.hidden==='false'?'hide':'show'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoriesForRootDir;
