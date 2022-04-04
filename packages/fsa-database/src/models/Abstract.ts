import { IDbBase, IUser } from "./types";

export abstract class AbstractEntity implements IDbBase {
  id?: number;
  name: string;
  created: number;
  creator?: IUser;
  updated: number;
  constructor(name: string, id?: number) {
    this.name = name;
    if (id) this.id = id;
    this.created = Date.now();
    this.updated = this.created;
  }
}


