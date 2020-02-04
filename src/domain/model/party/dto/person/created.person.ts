import {PersonEvent} from "./person.event";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CreatedPerson {
  @Field({nullable: true})
  eventName: string;
  @Field({nullable: true})
  personEvent: PersonEvent;
}