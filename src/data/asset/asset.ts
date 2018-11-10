import { AssetKind } from "./asset.kind";
import { AssetType } from "./asset.type";
import { UnitOfMeasure } from "../unit-of-measure/unit.of.measure";
import { User } from "../party/user";
import { Site } from "../site/site";

export class Asset {
    assetId: string;
    tenantId: string;
    assetKindId: string;
    assetKind: AssetKind;
    assetTypeId: string;
    assetType: AssetType;
    serialNumber: string;
    quantity: string;
    unitOfMeasureId: string;
    unitOfMeasure: UnitOfMeasure;
    description: string;
    personId: string;
    person: User;
    siteId: string;
    site: Site;
    createdOn: string;
    modifiedOn: string;
}
