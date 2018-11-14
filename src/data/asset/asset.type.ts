import { AssetTypeClass } from "./asset.type.class";
import { UnitOfMeasure } from "../unit-of-measure/unit.of.measure";
import { Value } from "./value";

export class AssetType {
    assetTypeId: string;
    assetTypeClassId: string;
    unitOfMeasureId: string;
    modelNumber: string;
    description: string;
    name: string;
    materialCode: string;
    assetTypeClass: AssetTypeClass;
    unitOfMeasure: UnitOfMeasure;
    values: Value[];
    createdOn: Date;
    modifiedOn: Date;
}
