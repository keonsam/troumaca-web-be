import { User } from "./user";
import { PartyAccessRole } from "../../authorization/party-access-role/party.access.role";

export class UserResponse {
  private _user: User;
  private _partyAccessRoles: PartyAccessRole[] = [];

  constructor(user?: User, partyAccessRoles?: PartyAccessRole[]) {
    this._user = user;
    this._partyAccessRoles = partyAccessRoles;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get partyAccessRoles(): PartyAccessRole[] {
    return this._partyAccessRoles;
  }

  set partyAccessRoles(value: PartyAccessRole[]) {
    this._partyAccessRoles = value;
  }

  toJson() {
    return {
      user: this.user,
      partyAccessRoles: this.partyAccessRoles
    };
  }

}
