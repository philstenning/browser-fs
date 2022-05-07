import { importInto } from "dexie-export-import";
import { ImportProgress } from "dexie-export-import/dist/import";
import { db } from "./setup";
import resetPermissionsOnAllDirectories from './resetPermissionsOnAllDirectories'

export default async function loadDatabase(file: File) {
  try {
    await importInto(db, file, {
      clearTablesBeforeImport: true,
      progressCallback: loadingFinished
    })

    await resetPermissionsOnAllDirectories()
  } catch (error) {
    console.error(`Error loading database ${error}`)
  }
};

const loadingFinished = (data: ImportProgress) => {
  if (data.completedRows) {
    console.log("finished loading data...");
    return true;
  }
  console.log("not finished");
  return false
};
