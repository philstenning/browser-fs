import { importInto } from "dexie-export-import";
import { ImportProgress } from "dexie-export-import/dist/import";
import { db } from "./setup";

const foo = (data: ImportProgress) => {
  if (!!data.done) {
    // console.log(` database import finished 👍`);
  }
  return true;
};

/**
 * Gets the db from the server with fetch()
 * this is used for testing only as the file handles
 * do not serialize
 * @param {string}fileName
 */
export const fetchDatabase = async (
  fileName: string = "testing/fsaDb.data"
) => {
  const request = new Request(fileName);

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
