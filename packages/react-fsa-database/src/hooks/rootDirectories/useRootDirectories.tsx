import {
  db,
  fsaDirectory,
  useLiveQuery,
  deleteRootDirectoryAndFiles,
} from "fsa-database";
import { useAddRootDirectory } from "../rootDirectories/useAddRootDirectory";

export function useRootDirectories() {
  const { addRootDirectory, isScanning } = useAddRootDirectory();

  const rootDirectories = useLiveQuery(() =>
    db.directories.where("isRoot").equals("true").toArray()
  );

  const deleteRootDirectory = (dir: fsaDirectory) => {
    deleteRootDirectoryAndFiles(dir);
  };
  return { rootDirectories, deleteRootDirectory, isScanning, addRootDirectory };
}
