import {Field, ObjectType} from "type-graphql";
import {RoleTypeStructureEvent} from "../../roletype/role.type.structure.event";

@ObjectType()
export class CreateRoleTypeStructuresResponse {
  @Field( {nullable: true})
  eventName: string;
  @Field( {nullable: true})
  roleTypeStructureEvents: RoleTypeStructureEvent[] = []
}