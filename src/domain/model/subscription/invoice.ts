import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Invoice {
    @Field()
    date: string;
    @Field( { nullable: true })
    description: string;
    @Field()
    amount: string;
    @Field()
    status: string;

    constructor(date: string, description: string, amount: string, status: string) {
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.status = status;
    }
}
