import React, { useState, useEffect } from "react";
import { set, entries } from "idb-keyval";
import { selectDirectoryOnUsersFileSystem } from "../utils/fs";
import {
  scanLocalDriveRecursively,
  VirtualFileSystemHandle,
  VirtualDirectory,
} from "../utils";
import {Link} from 'react-router-dom'

export default function Home() {
  const [rootDir, setRootDir] = useState<VirtualDirectory | null>(null);
  const [data, setData] = useState<VirtualFileSystemHandle[]>([]);
  const handleClick = async () => {
    const res = await selectDirectoryOnUsersFileSystem();

    if (res) {
      setRootDir(res);
      // console.log(res?.name);

      const d = await scanLocalDriveRecursively(res.handle, ["3mf"]);
      console.table(d);
      setData(d);

      // save to indexDB
      set(`__dir-handle__${res.name}`, res);
    }
  };
  async function getHandles() {
    console.log("getting handles...");
    const allHandles = await entries();
    console.table(allHandles);
  }
  useEffect(() => {
    getHandles();
  }, []);
  return (
    <div>
      <h1>welcome</h1>
      <nav>
        <Link to='about' >About</Link>
      </nav>

      <button onClick={handleClick} data-cy="btn-select">
        open folder
      </button>
      <hr />
      <ul>
        <li>name: {rootDir?.name}</li>
        <li>file path: {rootDir?.filePath}</li>
        <li>isRoot: {rootDir?.isRoot}</li>
        <li>created: {rootDir?.created.toDateString()}</li>
      </ul>
      <hr />
      {rootDir && <h3> {rootDir.name}</h3>}
      <ul className="bfl">
        {data.length > 0 &&
          data.map((entry) =>
            entry.kind === "file" ? (
              <li key={entry.id}> {entry.name} </li>
            ) : (
              <Folder key={entry.id} folder={entry} />
            )
          )}
      </ul>
    </div>
  );
}
interface Props {
  folder: VirtualFileSystemHandle;
}

function Folder({ folder }: Props) {
  return (
    <li key={folder.id} className="bfl__folder">
      {folder.name}
      <ul>
        {folder.entries?.map((entry) => {
          if (entry.kind === "file") {
            return (
              <li key={entry.id} className="bfl__file">
                <h6>{entry.name} </h6> <pre>{entry.path}</pre>{" "}
              </li>
            );
          } else {
            return <Folder key={entry.id} folder={entry} />;
          }
        })}
      </ul>
    </li>
  );
}
