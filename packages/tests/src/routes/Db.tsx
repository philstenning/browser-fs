import React, { useState } from "react";
import { db, useLiveQuery } from "fsa-database";
import {
  RecursiveUnorderedList,
} from "../components/recursive-folder";
import {
  scanLocalDrive,
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
} from "fsa-browser";
import { useRootDirectoryContext } from "react-fsa-browser";


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
      <ul>
        {rootDirectories.map((dir) => (
          <li onClick={() => handleRootDirClick(dir)}>{dir.name}</li>
        ))}
      </ul>
      <hr />
      {virtualFileEntry && (
        <RecursiveUnorderedList virtualEntry={virtualFileEntry} />
      )}
    </div>
  );
};

export default Db;
