import { AccessRole } from "./access.role";

export class PartyAccessRole {
  partyAccessRoleId: string;
  partyId: string;
  accessRoleId: string;
  accessRole: AccessRole;
  effectiveDate: Date;
  untilDate: Date;
  createdOn: Date;
  modifiedOn: Date;

}
