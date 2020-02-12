import {Field, ObjectType} from "type-graphql";
import {CredentialEvent} from "./credential.event";

@ObjectType()
export class CreatedCredential {
  @Field({nullable: true})
  eventName: string;
  @Field({nullable: true})
  credentialEvent: CredentialEvent;

  constructor(eventName?: string, credentialEvent?: CredentialEvent) {
    this.eventName = eventName;
    this.credentialEvent = credentialEvent;
  }

}
