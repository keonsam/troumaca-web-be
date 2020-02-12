import {Owner} from "./owner";
import {Field, ID} from "type-graphql";

export class Party extends Owner {
    @Field( () => ID)
    partyId: string;
}
