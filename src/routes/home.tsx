import React, { useState } from "react";

import { selectDirectoryOnUsersFileSystem } from "../utils/fs";
import {
  scanLocalDriveRecursively,
  VirtualFileSystemHandle,
} from "../utils/scanDirectory";
import { IVirtualDirectory } from "../utils/types";

export default function Home() {
  const [rootDir, setRootDir] = useState<IVirtualDirectory | null>(null);
  const [data, setData] = useState<VirtualFileSystemHandle[]>([]);
  const handleClick = async () => {
    const res = await selectDirectoryOnUsersFileSystem();

    if (res) {
      setRootDir(res);
      // console.log(res?.name);

      const d = await scanLocalDriveRecursively(res.handle,['3mf']);
      console.table(d);
      setData(d);
    }
  };

  return (
    <div>
      <h1>welcome</h1>

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
      <ul>
        {data.length > 0 &&
          data.map((entry) =>
            entry.kind === "file" ? (
              <li key={entry.id}> {entry.name} </li>
            ) : (
              <Folder folder={entry} />
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
    <li>
      <h4>{folder.name}</h4>
      <ul>
        {folder.entries?.map((entry) => {
          if (entry.kind === "file") {
            return (
              <li key={entry.id}>
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
