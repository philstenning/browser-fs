import React, { useState } from "react";
import md5 from "md5";
import { selectDirectoryOnUsersFileSystem } from "../utils/fs";
import { IVirtualFolder } from "../utils/types";

export default function Home() {
  const [rootDir, setRootDir] = useState<IVirtualFolder | null>(null);
  const handleClick = async () => {
    const res = await selectDirectoryOnUsersFileSystem();
    if (res) {
      setRootDir(res);
      console.log(res?.name);
    }
  };
  return (
    <div>
      <h1>welcome</h1>

      <button onClick={handleClick}>open folder</button>
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
      <pre>
        todo
        <ul>
          <li>get root directory</li>
          <li>loop over folders recursively</li>
          <li>return all folders and files as objects.</li>
        </ul>


      </pre>
    </div>
  );
}
