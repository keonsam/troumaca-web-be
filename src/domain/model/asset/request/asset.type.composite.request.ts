import { Field, InputType } from "type-graphql";
import {SelectedCharacteristicsRequest} from "./selected.characteristics.request";
import {PartOfAssetTypeStructureRequest} from "./part.of.asset.type.structure.request";
import {AssetTypeRequest} from "./asset.type.request";

@InputType()
export class AssetTypeCompositeRequest {
    @Field(() => AssetTypeRequest, {nullable: false})
    assetType: AssetTypeRequest;
    @Field(() => [PartOfAssetTypeStructureRequest], {nullable: true})
    partOfAssetTypeStructures: PartOfAssetTypeStructureRequest[] = [];
}
