import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AssetCharacteristicInput {
    @Field( () => ID)
    assetCharacteristicTypeId: string;
    @Field()
    name: string;
    @Field({nullable: true})
    defaultValue: string;
    @Field({nullable: true})
    description: string;
    @Field({nullable: true})
    preFilled: boolean;
    @Field({nullable: true})
    required: boolean;
}