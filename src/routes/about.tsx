import React, { useState, useEffect } from "react";
import {
  VirtualFileSystemEntry,
  checkPermissionsOfHandle,
} from "../utils/file-system-operations";
import {
  getAllVirtualRootDirectoriesAndCheckPermissions,
  deleteVirtualRootDirectory
} from "../utils/virtual-root-directories";

export default function About() {
  const [handles, setHandles] = useState<VirtualFileSystemEntry[]>([]);

  async function handleClick(vFSEntry: VirtualFileSystemEntry) {
    const res = await checkPermissionsOfHandle(
      vFSEntry.handle as FileSystemDirectoryHandle
    );
    if (res) {
      vFSEntry.hasReadPermission = true;
      const filtered = handles.filter((entry) => entry.id !== vFSEntry.id);
      setHandles((current) => [...filtered, vFSEntry]);
    }
    console.log(res);
  }

  const getHandles = async () => {
    const checkedHandles =
      await getAllVirtualRootDirectoriesAndCheckPermissions();
    if (checkedHandles) {
      setHandles(checkedHandles);
    }
  };

  async function restoreSession() {
    handles.forEach((handle) =>
      checkPermissionsOfHandle(handle.handle as FileSystemDirectoryHandle)
    );
  }

  const delHandle =async (handle: VirtualFileSystemEntry) => {
     const result = await deleteVirtualRootDirectory(handle);
     console.log('del', {result})
     if(result){

      setHandles(handles.filter(h=>h.id!== handle.id)) 

     }
  };

  useEffect(() => {
    getHandles();
  }, []);

  return (
    <div>
      {/* <button onClick={restoreSession}>restore session</button> */}
      <button onClick={getHandles}>Get All VirtualFileHandles</button>
      <hr />
      <ul>
        <h2>Handles in indexDB</h2>
        {handles.map((handle) => (
          <li key={handle.id}>
            {" "}
            <button className={""} onClick={() => handleClick(handle)}>
              <button onClick={() => delHandle(handle)}>del</button>
              {handle.name}
              {}
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
