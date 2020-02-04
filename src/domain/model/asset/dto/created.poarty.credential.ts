import {PartyCredentialEvent} from "./party.credential.event";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CreatedPartyCredential {
  @Field( {nullable: true})
  eventName: string;
  @Field( {nullable: true})
  partyCredentialEvent: PartyCredentialEvent;
}