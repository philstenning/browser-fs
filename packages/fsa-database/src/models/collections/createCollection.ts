import { db } from "../../db/setup";
import { fsaCollection,fsaCollectionFile } from "../types";
import {v4 as uuid} from 'uuid'
export async function createCollection(
  name: string,
  files: fsaCollectionFile[] = [],
  description = "",
  creator: string = "",
  tags: string[] = []
): Promise<fsaCollection | undefined> {
  const createdAt = Date.now();
  const collection: fsaCollection = {
    id:uuid(),
    created: createdAt,
    updated: createdAt,
    name,
    creator,
    files,
    tags,
    description,
  };

  if (name.length < 1) {
    name = "collection";
    collection.name = name;
  }

  // can not have duplicate names
  const count = await db.userCollections.where("name").equals(name).count();
  // console.log({count})
  if (count > 0) {
    const res = await appendCollectionName(name);
    if (res) {
      collection.name = res;
    }
  }

  const id = await db.userCollections.add(collection);
  return await db.userCollections.get(id);
}

// if name is foo => foo_1
// if name is foo_1 => foo_2
async function appendCollectionName(name: string) {
  let count = 1;
  let suffix = 0;
  while (count > 0) {
    suffix++;
    count = await db.userCollections
      .where("name")
      .equals(`${name}_${suffix}`)
      .count();
  }
  return `${name}_${suffix}`;
}
