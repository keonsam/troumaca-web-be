import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class RegistrationStep {
  @Field({nullable: true})
  name: string;
  @Field({nullable: true})
  description: string;
  @Field({nullable: true})
  status: boolean
}