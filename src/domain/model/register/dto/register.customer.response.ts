import {Field, ID, ObjectType} from "type-graphql";
import {RegistrationStep} from "./registration.step";

@ObjectType()
export class RegisterCustomerResponse {
  // from confirmation
  @Field(() => ID)
  confirmationId: string;
  @Field(() => ID)
  credentialId: string;
  @Field({nullable: true})
  code: string;
  @Field({nullable: true})
  confirmationType: string;
  @Field({nullable: true})
  organizationId: string;
  @Field({nullable: true})
  personId: string;

  // from credential
  @Field({nullable: true})
  status: string;

  // other
  @Field( {nullable: true})
  eventName: String;

  @Field(() => RegistrationStep, {nullable: true})
  registrationStep: RegistrationStep[] = [];

  // TODO: Deprecated
  @Field({nullable: true})
  modifiedOn: Date;
  @Field({nullable: true})
  createdOn: Date;
}