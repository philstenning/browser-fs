import { importInto } from "dexie-export-import";
import { ImportProgress } from "dexie-export-import/dist/import";
import { db, resetPermissionsOnAllDirectories } from "./setup";



export const importDatabase = async () => {
  try {
    const result = await window.showOpenFilePicker();
    if (result) {
      const blob = await result[0].getFile();
      await importInto(db, blob, {
        clearTablesBeforeImport: true,
        progressCallback: foo,
      });

        await resetPermissionsOnAllDirectories();
    }
  } catch (error) {
    console.error(`Error importing database ${error}`);
  }
};

const foo = (data: ImportProgress) => {
  console.log("rows imported:", data.totalRows);
  return true;
};

