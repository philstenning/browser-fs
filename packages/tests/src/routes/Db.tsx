import  { useState } from "react";
import { db, useLiveQuery } from "fsa-database";
import { RecursiveUnorderedList } from "../components/recursive-folder";
import {
  scanLocalDrive,
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
} from "fsa-browser";
import { useRootDirectoryContext } from "react-fsa-browser";
import AddFolder from "../junk/addToDb";

const Db = () => {
  const { rootDirectories } = useRootDirectoryContext();
  const [virtualFileEntry, setVirtualFileEntry] =
    useState<VirtualFileSystemEntry | null>(null);

  const handleRootDirClick = async (dir: VirtualRootDirectoryType) => {
    const data = await scanLocalDrive(dir.handle);
    if (data) setVirtualFileEntry(data);
  };

  return (
    <div>
      <hr />
      {/* <Data /> */}
      {/* list of root dirs */}
      <hr />
      {virtualFileEntry && (
        <AddFolder virtualFileSystemEntry={virtualFileEntry} />
      )}
      <ul>
        {rootDirectories.map((dir,index) => (
          <li key={index} onClick={() => handleRootDirClick(dir)}>{dir.name} </li>
        ))}
      </ul>

      <hr />

      {/*  list other */}
      {virtualFileEntry && (
        <RecursiveUnorderedList virtualEntry={virtualFileEntry} />
      )}
    </div>
  );
};

export default Db;

const Data = () => {
  const res = useLiveQuery(() => db.directories.toArray());
  return (
    <ul>
      {res && res?.map((folder) => (
        <li>
          {folder.name}

          <ul>
            <li >{folder.name}</li>
            <li>isRoot: {folder.isRoot.toString()}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};
