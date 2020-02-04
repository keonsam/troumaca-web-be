import {Credential} from "../credential";
import {Person} from "../../party/person/person";
import {Field, InputType} from "type-graphql";

@InputType()
export class CreateCredentialRequest {
  @Field({nullable: true})
  firstName: string;
  @Field({nullable: true})
  lastName: string;
  @Field({nullable: true})
  username: string;
  @Field({nullable: true})
  password: string;

  constructor(person: Person, credential: Credential) {
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.username = credential.username;
    this.password = credential.password;
  }
}