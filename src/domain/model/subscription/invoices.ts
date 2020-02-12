import {Field, ObjectType} from "type-graphql";
import {Invoice} from "./invoice";

@ObjectType()
export class Invoices {
    @Field()
    unPaid: number;
    @Field()
    paid: number;
    @Field(() => [Invoice])
    invoices: Invoice[];
}
