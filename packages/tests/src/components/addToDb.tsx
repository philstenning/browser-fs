import { createRootDbDirectory } from "fsa-database";
import { VirtualFileSystemEntry } from "fsa-browser";

type props = {
  virtualFileSystemEntry: VirtualFileSystemEntry;
};
export default function AddToDB({ virtualFileSystemEntry }: props) {
  const handleClick = async () => {
    if (virtualFileSystemEntry.handle.kind === "directory") {
      const res = await createRootDbDirectory(virtualFileSystemEntry.handle);
      if (res) console.log(res);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>ADD</button>
    </div>
  );
}
