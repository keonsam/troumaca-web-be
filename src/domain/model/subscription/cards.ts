import {Field, ObjectType} from "type-graphql";
import {Card} from "./card";

@ObjectType()
export class Cards {
    @Field( () => [Card])
    cards: Card[];
}
