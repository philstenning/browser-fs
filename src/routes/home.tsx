import { useState } from "react";
import {
  VirtualFileSystemEntry,
  VirtualRootDirectory,
} from "../utils/file-system-operations";
import { useRootDirectoryContext } from "../utils/context/root-directory-context";
export default function Home() {
  const {getNewRootDirectory } = useRootDirectoryContext();
 
 
  const [rootDirector, setRootDir] = useState<VirtualRootDirectory | null>(
    null
  );
  const [data, setData] = useState<VirtualFileSystemEntry[]>([]);
 
 
  const handleClick = async () => {

      const res =await getNewRootDirectory()
      if(res){
        setRootDir(res)
      }

  };
  return (
    <div>
      <button onClick={handleClick} data-cy="btn-select">
        open folder
      </button>
      <hr />
      <ul>
        <li>name: {rootDirector?.name}</li>
        <li>file path: {rootDirector?.filePath}</li>
        <li>created: {rootDirector?.created.toDateString()}</li>
      </ul>
      <hr />
      {rootDirector && <h3> {rootDirector.name}</h3>}
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
