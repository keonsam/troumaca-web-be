import {AssetCharacteristic} from "./asset.characteristic";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class SelectedCharacteristics extends AssetCharacteristic {
    @Field({nullable: true})
    preFilled: boolean;
    @Field({nullable: true})
    preFilledValue: string;
    @Field({nullable: true})
    required: string;
}