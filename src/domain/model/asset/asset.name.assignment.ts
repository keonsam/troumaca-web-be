import {AssetType} from "./asset.type";
import {AssetNameType} from "./asset.name.type";

export class AssetNameAssignment {
  assetNameAssignmentId: string;
  assetType: AssetType;
  assetNameType: AssetNameType;
  dateEffective: Date;
  dateUntil: Date;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}