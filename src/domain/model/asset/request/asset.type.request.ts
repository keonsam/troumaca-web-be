import { Field, InputType } from "type-graphql";
import {SelectedCharacteristicsRequest} from "./selected.characteristics.request";
import {PartOfAssetTypeStructureRequest} from "./part.of.asset.type.structure.request";

@InputType()
export class AssetTypeRequest {
    @Field({nullable: false})
    typeName: string;
    @Field({nullable: true})
    name: string;
    @Field({nullable: true})
    description: string;
    @Field({nullable: true})
    ownerPartyId: string;
    @Field({nullable: true})
    version: string;
    @Field({nullable: true})
    color: string;
    @Field({nullable: true})
    share: boolean;
    @Field({nullable: true})
    use: boolean;
    @Field(() => [SelectedCharacteristicsRequest], {nullable: true})
    characteristics: SelectedCharacteristicsRequest[];
    @Field(() => [PartOfAssetTypeStructureRequest], {nullable: true})
    partOfAssetTypeStructures: PartOfAssetTypeStructureRequest[] = [];
}
