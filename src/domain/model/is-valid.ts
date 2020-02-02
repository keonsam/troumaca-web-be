import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class IsValid {
    @Field()
    valid: boolean;
    constructor(valid: boolean) {
        this.valid = valid;
    }

}
