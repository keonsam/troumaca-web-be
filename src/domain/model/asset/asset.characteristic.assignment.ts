import {AssetType} from "./asset.type";
import {AssetCharacteristic} from "./asset.characteristic";

export class AssetCharacteristicAssignment {
  assetCharacteristicAssignmentId: string;
  assetType: AssetType;
  assetCharacteristic: AssetCharacteristic;
  dateEffective: Date;
  dateUntil: Date;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}