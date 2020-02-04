import {Field, InputType} from "type-graphql";

@InputType()
export class RegisterCustomerRequest {
  @Field({nullable: true})
  firstName: string;
  @Field({nullable: true})
  lastName: string;
  @Field({nullable: true})
  organizationName: string;
  @Field({nullable: true})
  username: string;
  @Field({nullable: true})
  password: string;
  @Field({nullable: true})
  confirmPassword: string;
}