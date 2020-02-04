import {Field, ObjectType} from "type-graphql";
import {OrganizationEvent} from "./organization.event";

@ObjectType()
export class CreatedOrganization {
  @Field( {nullable: true})
  eventName: string;
  @Field({nullable: true})
  organizationEvent: OrganizationEvent;
}