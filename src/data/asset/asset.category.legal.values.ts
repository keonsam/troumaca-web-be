import {Field, ObjectType} from "type-graphql";
import {AssetCategoryLegalValue} from "./asset.category.legal.value";

@ObjectType()
export class AssetCategoryLegalValues {
    @Field( () => [AssetCategoryLegalValue])
    assetCategoryLegalValues: AssetCategoryLegalValue[];
    constructor(assetCategoryLegalValues: AssetCategoryLegalValue[]) {
        this.assetCategoryLegalValues = assetCategoryLegalValues;
    }
}
