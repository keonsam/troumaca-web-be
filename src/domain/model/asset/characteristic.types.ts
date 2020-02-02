import { Field, ObjectType } from "type-graphql";
import { CharacteristicType } from "./characteristic.type";

@ObjectType()
export class CharacteristicTypes {
    @Field( () => [CharacteristicType])
    characteristicTypes: CharacteristicType[];
}
