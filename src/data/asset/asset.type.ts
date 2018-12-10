import { AssetClassification } from "./asset.classification";
import { UnitOfMeasure } from "../unit-of-measure/unit.of.measure";
import { Value } from "./value";

export class AssetType {
    assetTypeId: string;
    assetTypeKindId: string;
    assetTypeClassId: string;
    unitOfMeasureId: string;
    modelNumber: string;
    description: string;
    name: string;
    materialCode: string;
    assetTypeClass: AssetClassification;
    unitOfMeasure: UnitOfMeasure;
    values: Value[];
    createdOn: Date;
    modifiedOn: Date;
}
