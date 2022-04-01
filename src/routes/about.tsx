import {
  VirtualRootDirectory
} from "../utils/file-system-operations";
import { useRootDirectoryContext } from "../utils/context/root-directory-context";

export default function About() {
   const { rootDirectories, deleteRootDirectory ,getPermissionForVirtualRootDir} = useRootDirectoryContext();

  async function checkHandlePermission(virtualRootDir: VirtualRootDirectory) {
    await getPermissionForVirtualRootDir(virtualRootDir)
  //  throw new Error('not yet implemented error')
  }

  return (
    <div>
      <hr />
      <ul>
        <h2>Handles in indexDB</h2>
        {rootDirectories.map((handle) => (
          <li key={handle.id}>
            {" "}
            <button
              className={""}
              onClick={() => checkHandlePermission(handle)}
            >Check permission
              

              
            </button>{' '}
            <button onClick={() => deleteRootDirectory(handle)}>
                del {handle.name}
              </button>
            <p>{JSON.stringify(handle)}</p>
          </li>
        ))}
      </ul>

      <hr />
      <ul>
        <li>TODO:</li>
        <li>check permission</li>
        <li>load handles</li>
        <li>save handles</li>
      </ul>
      <hr />
      <ul>{/* {handles.} */}</ul>
    </div>
  );
}
