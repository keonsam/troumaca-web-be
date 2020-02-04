import {Field, ID, InputType, ObjectType} from "type-graphql";
import {RoleType} from "./role.type";

@ObjectType()
export class RoleTypeEvent {
  @Field( () => ID, {nullable: true})
  eventId: string;
  @Field( {nullable: true})
  roleType: RoleType;
  @Field( {nullable: true})
  process: string;
  @Field( {nullable: true})
  state: string;
  @Field( {nullable: true})
  outcome: string;
  @Field( {nullable: true})
  qualifier: string;
  @Field( {nullable: true})
  correlationId: string;
  @Field( {nullable: true})
  requesterPartyId: string;
  @Field( {nullable: true})
  dateOfEventLocal: Date;
  @Field( {nullable: true})
  dateOfEventTimeZoneId: string;
  @Field( {nullable: true})
  dateOfEventUtc: Date;
  @Field( {nullable: true})
  dateOfEventTimeZoneVersion: string;
}