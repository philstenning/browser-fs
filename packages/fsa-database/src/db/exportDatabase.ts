import { exportDB, importInto } from "dexie-export-import";
import { ImportProgress } from "dexie-export-import/dist/import";
import { db } from "./setup";

export const exportDatabase = async () => {
  try {
    const blob = await exportDB(db, {});

    const result = await window.showSaveFilePicker({
      suggestedName: "fsaDb.data",
    });
    const writableFileStream = await result.createWritable();
    await writableFileStream.write(blob);
    writableFileStream.close();
  } catch (error) {
    console.error(`Error exporting database ${error}`);
  }
};

export const importDatabase = async () => {
  try {
    const result = await window.showOpenFilePicker();
    if (result) {
      const blob = await result[0].getFile();
      await importInto(db, blob, {
        clearTablesBeforeImport: true,
        progressCallback: foo,
      });
    }
  } catch (error) {
    console.error(`Error importing database ${error}`);
  }
};

const foo = (data: ImportProgress) => {
  console.log("rows imported:", data.totalRows);
  return true;
};

export const fetchDatabase = async () => {
  const request = new Request("fsaDb.data");

  try {
      const response = await fetch(request);
      if (response.ok) {
        const blob = await response.blob();
        await importInto(db, blob, {
          clearTablesBeforeImport: true,
          progressCallback: foo,
        });
      }
      
  } catch (error) {
    console.error(`Error fetching database ${error}`);
  }
};
