import {Field, InputType} from "type-graphql";

@InputType()
export class Paging {
    @Field()
    pageSize: number;
    @Field()
    pageNumber: number;
}
