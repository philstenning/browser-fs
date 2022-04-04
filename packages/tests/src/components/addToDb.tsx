import { createRootDirectoryInDatabase } from "fsa-database";
import { VirtualFileSystemEntry } from "fsa-browser";

type props = {
  virtualFileSystemEntry: VirtualFileSystemEntry;
};
export default function AddToDB({ virtualFileSystemEntry }: props) {
  const handleClick = async () => {
    const res = await createRootDirectoryInDatabase(virtualFileSystemEntry);
    if (res) console.log(res);
  };
  return (
    <div>
      <button onClick={handleClick}>ADD</button>
    </div>
  );
}
