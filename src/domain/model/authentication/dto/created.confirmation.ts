import {Field, ObjectType} from "type-graphql";
import {ConfirmationEvent} from "./confirmation.event";

@ObjectType()
export class CreatedConfirmation {
  @Field({nullable: true})
  eventName: string;
  @Field({nullable: true})
  confirmationEvent: ConfirmationEvent;
}