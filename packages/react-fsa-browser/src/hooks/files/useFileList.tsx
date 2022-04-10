import { useState, useEffect } from "react";
import { db, useLiveQuery } from "fsa-database";
import { fsaFile } from "fsa-database";
function useFileList(
  filterBySelectedFileTypes: boolean = false,
  rootDirId:number=0,
  filterByRootDirectory: boolean = true
  ) {
    const n = rootDirId
    console.log({n})
  const res = useLiveQuery(() =>{
  console.log(n)
   return db.state.toCollection().last()
  }
  );
  console.log('called', {rootDirId} , res?.id, {...res})
  return useLiveQuery(()=>db.files.where('type').equals('3mf').toArray());
  
  if (filterBySelectedFileTypes) {
    // console.log('fone')
    // return useLiveQuery(() => filterFileTypesOnly()) ?? [];
  }
  // return useLiveQuery(() => filterNone()) ?? [];
}

const filterFileTypesAndRootDirs = () => {};

const filterRootDirsOnly = (rootDirId: number = 0) => {
 return  db.files
        .where("rootId")
        .equals(rootDirId)
        .toArray();
    
};

const filterFileTypesOnly = () =>
  db.fileTypes.toArray().then((ft) =>
    db.files
      .where("type")
      //filter the fileTypes then return only the name
      .anyOf(...ft.filter((t) => t.selected).map((t) => t.name))
      .toArray()
  );

const filterNone = () => db.files.toArray();

export { useFileList };
