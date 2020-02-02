import {Field, ID, InputType} from "type-graphql";

@InputType()
export class SelectedCharacteristicsRequest {
    @Field( () => ID)
    assetCharacteristicId: string;
    @Field({nullable: true})
    preFilled: boolean;
    @Field({nullable: true})
    preFilledValue: string;
    @Field({nullable: true})
    required: boolean;
}