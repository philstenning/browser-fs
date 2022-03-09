import React, { useState, useEffect } from "react";
import { browserCheck } from "../utils/features";
import {
  getSavedHandles,
  getSavedHandlesWithPermission,
  VirtualFileSystemHandle,
  checkPermissionsOfHandle,
} from "../utils";

export default function About() {
  const [handles, setHandles] = useState<VirtualFileSystemHandle[]>([]);

  async function handleClick(handle: VirtualFileSystemHandle) {
    const res = await checkPermissionsOfHandle(
      handle.handle as FileSystemDirectoryHandle
    );
    console.log(res);
  }



 


  const getHandles = async () => {
    const _handles = await getSavedHandles();
    console.table(_handles);
    if (_handles) setHandles(_handles);
  };

   async function restoreSession(){
      handles.forEach(handle=>checkPermissionsOfHandle(handle.handle as FileSystemDirectoryHandle))
   }


   async function hasPermissions(virtualHandle: VirtualFileSystemHandle){
      if(virtualHandle.kind==='directory'){
         return await checkPermissionsOfHandle(virtualHandle.handle as FileSystemDirectoryHandle)
     
      }
      return false
   }

  useEffect(() => {
    getHandles();
  }, []);

  return (
    <div>

      <button onClick={restoreSession}>restore session</button>
      <button onClick={restoreSession}>clear sessions</button>
      <hr />
      <ul>
        {handles.map((handle) => (
          <li key={handle.id}>
            {" "}
            <button className={''} onClick={() => handleClick(handle)}>{handle.name}{}</button>
          </li>
        ))}
      </ul>

      <hr />
      <ul>
        <li>check permission</li>
        <li>load handles</li>
        <li>save handles</li>
      </ul>
      <hr />
      <ul>
        {/* {handles.} */}
      </ul>
    </div>
  );
}
