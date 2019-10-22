import { Field, ObjectType } from "type-graphql";
import { AssetCharacteristicType } from "./asset.characteristic.type";

@ObjectType()
export class AssetCharacteristicTypes {
    @Field( () => [AssetCharacteristicType])
    types: AssetCharacteristicType[];
}
