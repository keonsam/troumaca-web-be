import {Party} from "./party";

export class User extends Party {

  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  dateOfBirth: Date;

  get name(): string {
    return `${this.lastName || ""}, ${this.firstName || ""}`;
  }
}
