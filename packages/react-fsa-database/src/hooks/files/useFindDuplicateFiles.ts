import { db, fsaFile, useLiveQuery, updateFile } from "fsa-database";

export function useFindDuplicateFiles(showHidden = false, rootId = "") {
  const duplicateFiles =
    useLiveQuery(async () => {
      let files: fsaFile[] = [];
      // if we pass in a root id
      // filter only that directory
      if (rootId === "") {
        files = await db.files.orderBy('name').toArray();
      } else {
        files = await db.files.where({ rootId }).toArray();
      }

      if(showHidden) files = files.filter(f=>f.hidden==='false')
      // reduce the files to distinct names only
      const distinctNames = new Set(files.map((n) => n.name));
      // create an array of new objects with a count field & ids
      const objectWithCount: IDuplicateFiles[] = Array.from(distinctNames).map(
        (n, index) => ({
          id: index,
          name: n,
          count: files.filter((f) => f.name === n).length,
          fileIds: files.filter((f) => f.name === n).map((f) => f.id),
        })
      );
      // finally only return the new object where we have duplicate files names .
      return objectWithCount.filter((f) => f.count >= 2);
    }, [rootId,showHidden]) ?? [];

  const hideFile = async (file: fsaFile) => {
    file.hidden = "false";
    return await updateFile(file);
  };

  const unHideFile = async (file: fsaFile) => {
    file.hidden = "true";
    return await updateFile(file);
  };

  const toggleHidden = async (file: fsaFile) => {
    if (file.hidden === "false") {
      return await unHideFile(file);
    }
    return await hideFile(file);
  };

  const unHideAllForFileName = async (
    fileName: string,
    rootId: string = ""
  ) => {
    const files = await db.files.where("name").equals(fileName).toArray();
    if (rootId === "") {
      files.forEach((f) => (f.hidden = "false"));
      await db.files.bulkPut(files);
      return;
    }
    files
      .filter((f) => f.rootId === rootId)
      .forEach((f) => (f.hidden = "false"));
    await db.files.bulkPut(files);
  };

  return {
    duplicateFiles,
    hideFile,
    toggleHidden,
    unHideFile,
    unHideAllForFileName,
  };
}

export interface IDuplicateFiles {
  id: number;
  name: string;
  count: number;
  fileIds: string[];
}
