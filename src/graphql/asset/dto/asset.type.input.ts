import { Field, InputType } from "type-graphql";
import {SelectedCharacteristicsInput} from "./selected.characteristics.input";

@InputType()
export class AssetTypeInput {
    @Field()
    name: string;
    @Field({nullable: true})
    description: string;
    @Field()
    color: string;
    @Field({nullable: true})
    share: boolean;
    @Field({nullable: true})
    use: boolean;
    @Field(() => [SelectedCharacteristicsInput], {nullable: true})
    characteristics: SelectedCharacteristicsInput[];
}
