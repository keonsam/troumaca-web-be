import {User} from "./user";
import {PartyAccessRole} from "../authorization/party.access.role";

export class UserResponse {
  user: User;
  partyAccessRoles: PartyAccessRole[] = [];

  constructor(user?: User, partyAccessRoles?: PartyAccessRole[]) {
    this.user = user;
    this.partyAccessRoles = partyAccessRoles;
  }
}
