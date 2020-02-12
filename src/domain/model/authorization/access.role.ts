import {AccessRoleType} from "./access.role.type";
import { Grant } from "./grant";
import {Field, ID} from "type-graphql";

export class AccessRole {
  @Field( () => ID)
  accessRoleId: string;
  @Field()
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
