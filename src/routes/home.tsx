import { useState, useEffect } from "react";
import { entries } from "idb-keyval";
import { selectRootDirectoryOnLocalDrive } from "../utils/file-system-operations/fs";
import {
  scanLocalDriveRecursively,
  VirtualFileSystemEntry,
  VirtualRootDirectory,
} from "../utils/file-system-operations";
import { saveVirtualRootDirectory } from "../utils/virtual-root-directories";

export default function Home() {
  const [rootDir, setRootDir] = useState<VirtualRootDirectory | null>(null);
  const [data, setData] = useState<VirtualFileSystemEntry[]>([]);
  const handleClick = async () => {
    const res = await selectRootDirectoryOnLocalDrive();

    if (res) {
      setRootDir(res);
      // console.log(res?.name);

      const d = await scanLocalDriveRecursively(res.handle, ["3mf",'stl','gcode'],9);
      console.table(d);
      console.log(JSON.stringify(d))
      setData(d);

      // save to indexDB
      // set(`__dir-handle__${res.name}`, res);
      const entry = await saveVirtualRootDirectory(res);
    }
  };
  async function getHandles() {
    console.log("getting handles...");
    // const allHandles = await entries();
    // console.table(allHandles);
  }
  useEffect(() => {
    getHandles();
  }, []);
  return (
    <div>
      <button onClick={handleClick} data-cy="btn-select">
        open folder
      </button>
      <hr />
      <ul>
        <li>name: {rootDir?.name}</li>
        <li>file path: {rootDir?.filePath}</li>
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
  folder: VirtualFileSystemEntry;
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
