import React, { useEffect, useState } from "react";
import { useFindDuplicateFiles, } from "react-fsa-database";
import { db, useLiveQuery } from "fsa-database";
import { IDuplicateFiles } from "react-fsa-database/src/hooks/files";

//@ts-ignore
import styles from "./duplicateFiles.module.css";

function DuplicateFiles() {
  const [filtered, setFiltered] = useState<IDuplicateFiles | null>(null);
  const { duplicateFiles, toggleHidden } = useFindDuplicateFiles(true);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    file: IDuplicateFiles
  ) => {
    setFiltered(file);
  };

  return (
    <div data-testid="duplicateFiles">
      <FileList file={filtered} allFiles={duplicateFiles} />
      <ul data-testid="dupFileGroupList">
        {duplicateFiles &&
          duplicateFiles.map((f,index) => (
            <li
              key={f.id}
              onClick={(e) => handleClick(e, f)}
              data-testid={`dupFileListItem-${index}`}
            >
              {f.name} ({f.count}){" "}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DuplicateFiles;

type Props = {
  file: IDuplicateFiles;
  allFiles: IDuplicateFiles[];
};

const FileList = ({ file}: Props) => {
    const { toggleHidden } = useFindDuplicateFiles(true);
  const filtered = useLiveQuery(async () => {
      if(file){
          
          return (await db.files.where("name").equals(file.name).toArray()).filter(f=>f.hidden==='false')
      }
     
  },[file])??[]

  return (
    <div>
      <h5>Ids of duplicate files</h5>
      <ul data-testid="dupFileList">
        {filtered.length > 1 &&
          filtered.map((f,index) => (
            <li
              key={f.id}
              onClick={() => toggleHidden(f)}
              data-testid={`dupFileListItem-${index}`}
            >
              {f.name} {f.hidden}
            </li>
          ))}
      </ul>
    </div>
  );
};
