import {AccessRoleType} from "./access.role.type";
import { Grant } from "./grant";

export class AccessRole {
  accessRoleId: string;
  name: string;
  accessRoleTypeId: string;
  accessRoleType: AccessRoleType;
  grants: Grant[];
  prohibitionIndicator: boolean;
  effectiveDate: Date;
  untilDate: Date;
  description: string;
  ownerPartyId: string;
  createdOn: Date;
  modifiedOn: Date;
}
