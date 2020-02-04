import {Field, ID, ObjectType} from "type-graphql";
import {PartyType} from "../../partytype/party.type";

@ObjectType()
export class PartyTypeEvent {
  @Field(() => ID, {nullable: true})
  eventId: string;
  @Field({nullable: true})
  partyType: PartyType;
  @Field({nullable: true})
  process: string;
  @Field({nullable: true})
  state: string;
  @Field({nullable: true})
  outcome: string;
  @Field({nullable: true})
  qualifier: string;
  @Field({nullable: true})
  correlationId: string;
  @Field({nullable: true})
  requesterPartyId:  string;
  @Field({nullable: true})
  dateOfEventLocal: Date;
  @Field({nullable: true})
  dateOfEventTimeZoneId:  string;
  @Field({nullable: true})
  dateOfEventUtc: Date;
  @Field({nullable: true})
  dateOfEventTimeZoneVersion:  string;
}