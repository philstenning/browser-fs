import {  db, useLiveQuery, fsaFile } from "fsa-database";
function useDirectoryFiles() {
  const directoryFiles = useLiveQuery<fsaFile[]>(async () => {
    const state = await db.state.toCollection().last();
    if (!state || !state.currentDirectoryId) return [];
    // const currentDir = await db.directories.get(currentDirectoryId)
    return await db.files
      .where({parentId:state.currentDirectoryId,hidden:'false'})
      .toArray();
  }, []) ?? [];

  console.log('gtt\vggg')
  return { directoryFiles };
}

export {useDirectoryFiles} ;
