import {Party} from "./party";
import { PartyAccessRole } from "../authorization/party.access.role";

export class User extends Party {

  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  partyAccessRoles: PartyAccessRole[];
  dateOfBirth: Date;

  get name(): string {
    return `${this.lastName || ""}, ${this.firstName || ""}`;
  }
}
