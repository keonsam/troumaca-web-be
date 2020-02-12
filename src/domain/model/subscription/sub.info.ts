import {ObjectType} from "type-graphql";
import {Card} from "./card";

@ObjectType()
export class SubInfo {
    sub: string;
    card: Card;
    invoice: string;
}
