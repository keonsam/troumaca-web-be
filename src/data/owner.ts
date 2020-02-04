import {Base} from "./base";
import {Field, ID} from "type-graphql";

export class Owner extends Base {
    @Field( () => ID)
    ownerPartyId: string;
}
