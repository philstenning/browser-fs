import { fsaError } from "../types";
import {db} from '../../db/setup'

export class DbError implements fsaError{
  message: string;
  success: boolean;
  info: string;
  type: "warning" | "error" | "unknown";
  constructor(
    message: string,
    type: "warning" | "error" | "unknown"='error',
    info: string = "",
    success: boolean = false
  ) {
    this.message = message;
    this.success = success;
    this.info = info;
    this.type = type ?? "warning";
    this.save()
    this.log()
  }
  log() {
    switch (this.type) {
      case "error":
        console.error(this.message, this.info);
        break;
      case "warning":
        console.warn(this.message, this.info);
        break;

      default:
        console.log(this.message, this.info);
        break;
    }
  }
  save(){
    db.errors.add({...this})
  }
}


