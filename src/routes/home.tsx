import React, { useState } from "react";
import md5 from "md5";
import { selectDirectoryOnUsersFileSystem } from "../utils/fs";
import {
  scanLocalDriveRecursively,
  VirtualFileSystemHandle,
} from "../utils/scanDirectory";
import { IVirtualDirectory } from "../utils/types";
import { entries } from "cypress/types/lodash";
import { json } from "stream/consumers";
import { listenerCount } from "process";

export default function Home() {
  const [rootDir, setRootDir] = useState<IVirtualDirectory | null>(null);
  const [data, setData] = useState<VirtualFileSystemHandle[]>([]);
  const handleClick = async () => {
    const res = await selectDirectoryOnUsersFileSystem();

    if (res) {
      setRootDir(res);
      console.log(res?.name);

      const d = await scanLocalDriveRecursively(res.handle);
      console.table(d);
      setData(d);
    }
  };

  function tree(folder: VirtualFileSystemHandle) {
    return (
      <ul>
        {folder.entries?.map(
          (entry) =>
            entry.kind === "file" && <li key={entry.id}> {entry.name}</li>
        )}
      </ul>
    );
  }

  return (
    <div>
      <h1>welcome</h1>

      <button onClick={handleClick} data-cy="btn-select">
        open folder
      </button>
      {rootDir && <h3> {rootDir.name}</h3>}
      <hr />
      <ul>
        <li>name: {rootDir?.name}</li>
        <li>file path: {rootDir?.filePath}</li>
        <li>isRoot: {rootDir?.isRoot}</li>
        <li>created: {rootDir?.created.toDateString()}</li>
        {/* <li>created: {rootDir?.handle.}</li> */}
        {/* <li>created: {rootDir?.updated}</li> */}
      </ul>
      <hr />
      <div>
        {/* {tree(data[0])} */}
        {/* {JSON.stringify(data[0])} */}
        {data.map(
          (entry) => entry.kind === "directory" && <Folder folder={entry} />
        )}

       
      </div>
    </div>
  );
}
interface Props {
  folder: VirtualFileSystemHandle;
}

function Folder({ folder }: Props){
  return (
    <div>
      <h1>{folder.name}</h1>
      <pre>depth: {folder.depth}</pre>
      <pre>path: {folder.path}</pre>
      <ul>
        {folder.entries?.map((entry) => {
          if(entry.kind==='file'){
            return <li key={entry.id}> {entry.name} </li>;
          }else{
            return Folder({folder:entry})
          }
          
        })}
      </ul>
    </div>
  );
};
