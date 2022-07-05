import { db } from "@db/setup";

export default async function findLastUsedCollection() {
  // filter state to not empty
  try {
    const filteredState = await db.state
      .reverse()
      .filter(
        (f) => f.currentCollectionId !== "" && f.currentCollectionId !== "null"
      )
      .toArray();
    // find the firs valid option.
    for (const state of filteredState) {
      if (state.currentCollectionId) {
        const col = await db.userCollections.get(state.currentCollectionId);
        if (col) {
          return col;
        }
      }
    }
  } catch (error) {
    console.error(`Error finding last Collection. ${error}`);
  }
  return null;
}
