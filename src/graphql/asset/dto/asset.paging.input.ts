import {Field, InputType} from "type-graphql";

@InputType()
export class AssetPagingInput {
    @Field({nullable: true})
    pageSize: number;
    @Field({nullable: true})
    pageNumber: number;
}
