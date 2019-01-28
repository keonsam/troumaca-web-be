import {AssetCharacteristic} from "./asset.characteristic";
import {AssetCharacteristicAssignment} from "./asset.characteristic.assignment";
import {AssetNameAssignment} from "./asset.name.assignment";
import {AssetIdentifierAssignment} from "./asset.identifier.assignment";

export class AssetType {

    assetTypeId: string;
    typeName: String;
    name: string;
    description: string;
    partOfAssetTypes: AssetType[];
    composeOfAssetTypes: AssetType[];
    assetCharacteristics: AssetCharacteristic[];
    assetCharacteristicAssignments: AssetCharacteristicAssignment[];
    assetNameAssignments: AssetNameAssignment[];
    assetIdentifierAssignments: AssetIdentifierAssignment[];

}
