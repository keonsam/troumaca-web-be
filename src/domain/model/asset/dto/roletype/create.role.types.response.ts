import {RoleTypeEvent} from "../../roletype/role.type.event";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CreateRoleTypesResponse {
  @Field( {nullable: true})
  eventName: string;
  @Field( {nullable: true})
  roleTypeEvents: RoleTypeEvent[] = []
}