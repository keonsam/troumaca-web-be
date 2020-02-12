import {AccessRole} from "./access.role";

export class PartyAccessRole {
  partyAccessRoleId: string;
  partyId: string;
  accessRoleId: string;
  accessRole: AccessRole;
  createdOn: Date;
  modifiedOn: Date;
  ownerPartyId: string;

  constructor(accessRoleId?: string, partyAccessRoleId?: string, partyId?: string, ownerPartyId?: string) {
    this.accessRoleId = accessRoleId;
    this.partyAccessRoleId = partyAccessRoleId;
    this.partyId = partyId;
    this.ownerPartyId = ownerPartyId;
  }
}
