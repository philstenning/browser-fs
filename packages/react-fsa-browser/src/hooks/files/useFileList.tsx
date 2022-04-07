import { db, useLiveQuery } from "fsa-database";

function useFileList(filterBySelectedFileTypes: boolean = false) {
  if (filterBySelectedFileTypes) {
    return (
      useLiveQuery(() =>
        db.fileTypes.toArray().then((ft) =>
          db.files
            .where("type")
            //filter the fileTypes then return only the name
            .anyOf(...ft.filter((t) => t.selected).map((t) => t.name))
            .toArray()
        )
      ) ?? []
    );
  }
  return (
    useLiveQuery(() =>
      db.fileTypes.toArray().then((ft) =>
        db.files
          .where("type")
          .anyOf(...ft.map((t) => t.name))
          .toArray()
      )
    ) ?? []
  );
}


export {useFileList} 