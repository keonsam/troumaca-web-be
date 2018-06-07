import {AccessRole} from "./access.role";
import {Grant} from "../grant/grant";

export class AccessRoleResponse {
  private _accessRole: AccessRole;
  private _grants: Grant[];

  constructor(accessRole: AccessRole, grants: Grant[]) {
    this._accessRole = accessRole;
    this._grants = grants;
  }

  get accessRole(): AccessRole {
    return this._accessRole;
  }

  set accessRole(value: AccessRole) {
    this._accessRole = value;
  }

  get grants(): Grant[] {
    return this._grants;
  }

  set grants(value: Grant[]) {
    this._grants = value;
  }

  toJson() {
      return {
       accessRole: this.accessRole,
       grants: this.grants
      };
  }
}
