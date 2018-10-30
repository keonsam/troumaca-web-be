import { AccessRole } from "./access.role";

export class PartyAccessRole {
  partyAccessRoleId: string;
  partyId: string;
  accessRoleId: string;
  accessRole: AccessRole;
  createdOn: Date;
  modifiedOn: Date;
}
