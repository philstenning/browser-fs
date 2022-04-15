import {  db, useLiveQuery, fsaFile } from "fsa-database";
function useDirectoryFiles() {
  const directoryFiles = useLiveQuery<fsaFile[]>(async () => {
    const state = await db.state.toCollection().last();
    if (!state || !state.currentDirectoryId) return [];
    // const currentDir = await db.directories.get(currentDirectoryId)
    return await db.files
      .where("parentId")
      .equals(state.currentDirectoryId)
      .toArray();
  }, []);

  return { directoryFiles };
}

export {useDirectoryFiles} ;
