import {AccessRole} from "./access.role";
import {Grant} from "./grant";

export class AccessRoleResponse {
  constructor(accessRole: AccessRole, grants: Grant[]) {
    this._accessRole = accessRole;
    this._grants = grants;
  }

  private _accessRole: AccessRole;

  get accessRole(): AccessRole {
    return this._accessRole;
  }

  set accessRole(value: AccessRole) {
    this._accessRole = value;
  }

  private _grants: Grant[];

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
