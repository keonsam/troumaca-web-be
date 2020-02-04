import {PartyTypeEvent} from "./party.type.event";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CreatedPartyTypes {
  @Field({nullable: true})
  eventName: string;
  @Field( () => PartyTypeEvent)
  partyTypeEvents: PartyTypeEvent[] = []
}