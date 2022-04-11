import { useState } from "react";
import {
  useRootDirectoryContext,
  VirtualFileSystemEntry,
  VirtualRootDirectoryType,
} from "react-fsa-browser";
import {RecursiveFolder} from '../components/recursive-folder'
export default function Home() {
  const { getNewRootDirectory } = useRootDirectoryContext();

  const [rootDirector, setRootDir] = useState<VirtualRootDirectoryType | null>(
    null
  );
  const [data, setData] = useState<VirtualFileSystemEntry[]>([]);

  const handleClick = async () => {
    const res = await getNewRootDirectory();
    if (res) {
      setRootDir(res);
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
              <RecursiveFolder key={entry.id} folder={entry} />
            )
          )}
      </ul>
    </div>
  );
}



