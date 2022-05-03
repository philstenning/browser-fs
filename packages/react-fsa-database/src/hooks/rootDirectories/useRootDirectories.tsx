import {
  db,
  fsaDirectory,
  useLiveQuery,
  deleteRootDirectoryAndFiles,
  rootDirHasFilesInCollections,
} from "fsa-database";
import { useAddRootDirectory } from "../rootDirectories/useAddRootDirectory";
// import second from "serialize-javascript";
// import   from "";
export function useRootDirectories() {
  const { addRootDirectory, isScanning } = useAddRootDirectory();

  const rootDirectories = useLiveQuery(() =>
    db.directories
      .orderBy("created")
      .filter((f) => f.isRoot === "true")
      .toArray()
  );

  const deleteRootDirectory = async (dir: fsaDirectory) => {
    const hasCollections = await rootDirHasFilesInCollections(dir.id);
    if (hasCollections) {
      console.error("TODO: have collections don't delete");
      // return;
    }

    deleteRootDirectoryAndFiles(dir);
  };
  return { rootDirectories, deleteRootDirectory, isScanning, addRootDirectory };
}
