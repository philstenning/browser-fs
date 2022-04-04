import { IDbFolder } from "./types";
import {AbstractEntity} from './Abstract'

//TODO CLASSED only shallow copy !!!! remove.
export class Folder extends AbstractEntity implements IDbFolder {
  handle: FileSystemDirectoryHandle;
  isRoot: boolean;
  rootId: number;
  depth: number;
  //   parts: IDbFile[];
  path: string;
  label: string;
  constructor(
    name: string,
    handle: FileSystemDirectoryHandle,
    isRoot: boolean = false,
    rootId: number,
    depth: number,
    path: string,
    label: string = "",
    id?: number
  ) {
    super(name, id);
    this.handle = handle;
    console.log(this.handle)
    this.isRoot = isRoot;
    this.rootId = rootId;
    this.depth = depth;
    this.path = path;
    this.label = label;
  }
  
  

  log() {
    console.log(JSON.stringify(this));
  }

  showHandle(){
    console.log(JSON.stringify(this.handle))
  }
}
