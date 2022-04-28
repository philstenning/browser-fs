import {
  db,
  fsaDirectory,
  useLiveQuery,
  deleteRootDirectoryAndFiles,
} from "fsa-database";
import { useAddRootDirectory } from "../rootDirectories/useAddRootDirectory";
// import second from "serialize-javascript";
// import   from "";
export function useRootDirectories() {
  const { addRootDirectory, isScanning } = useAddRootDirectory();

  const rootDirectories = useLiveQuery(() =>
    db.directories.where("isRoot").equals("true").toArray()
  );

  const deleteRootDirectory = (dir: fsaDirectory) => {
    const { handle } = dir;
    const g = JSON.parse(JSON.stringify(handle));


    deleteRootDirectoryAndFiles(dir);
  };
  return { rootDirectories, deleteRootDirectory, isScanning, addRootDirectory };
}
