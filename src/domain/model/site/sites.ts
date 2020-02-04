import {Field, ObjectType} from "type-graphql";
import {Site} from "./site";

@ObjectType()
export class Sites {
    @Field( () => [Site], {nullable: true})
    sites: Site[];

    constructor(sites?: Site[]) {
        this.sites = sites;
    }
}