import { fsaDirectory, db } from "fsa-database";

export async function hideDirAndFiles(
  directory: fsaDirectory,
  hide: "true" | "false" = "true"
) {
  await db.transaction("rw", db.directories, db.files, async () => {
    try {
      const files = await db.files.bulkGet(directory.fileIds);

      files.forEach((file) => {
        if (!file) return;
        file.hidden = hide;
        db.files.put(file);
      });
      directory.hidden=hide
      await db.directories.put(directory);

    } catch (e) {
      console.error(
        `error hiding directory and it's files. ${directory.name} ${e}`
      );
      return false;
    }
  });
  return true;
}
