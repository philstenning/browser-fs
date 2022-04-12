import { db } from "../../db/setup";
import { fsaCollection } from "../types";

export async function createCollection(
  name: string,
  files: number[] = [],
  description = "",
  creator: string = "",
  tags: string[] = []
): Promise<fsaCollection | undefined> {
  const createdAt = Date.now();
  const collection: fsaCollection = {
    created: createdAt,
    updated: createdAt,
    name,
    creator,
    files,
    tags,
    description,
  };


  const id = await db.userCollections.add(collection);
  return await db.userCollections.get(id);
}
