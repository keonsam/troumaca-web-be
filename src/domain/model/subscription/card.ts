import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Card {
    @Field()
    name: string;
    @Field()
    type: string;
    @Field()
    number: string;
    @Field()
    check: boolean;


    constructor(name: string, type: string, number: string, check: boolean) {
        this.name = name;
        this.type = type;
        this.number = number;
        this.check = check;
    }
}
