import { Field, InputType } from "type-graphql";
import {SelectedCharacteristicsRequest} from "./selected.characteristics.request";

@InputType()
export class AssetTypeRequest {
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
    @Field(() => [SelectedCharacteristicsRequest], {nullable: true})
    characteristics: SelectedCharacteristicsRequest[];
}
