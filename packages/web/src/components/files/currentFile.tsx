import { useFsaDbContext } from "react-fsa-database";
import { db, useLiveQuery } from "fsa-database";

export default function currentFile() {
  //   const { dbState } = useFsaDbContext();
  const file = useLiveQuery(async () => {
    const state = await db.state.toCollection().last();
    if (state && !!state.currentFileId) {
      console.log(JSON.stringify(state));

      try {
        return await db.files.get(state.currentFileId);
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  });
  if (!file) return <div>null</div>;
  return (
      <div>
      <h4>Current Selected File</h4>
    <ul test-cy='selectedFile'>
      <li>{file.name}</li>
      <li>hidden: {file.hidden}</li>
     <li>collections <span data-cy='filesCollections'>{file.userCollectionIds.length}</span> </li>
      <li>{file.size}</li>
    </ul>
      </div>
  );
}
