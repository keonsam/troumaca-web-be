import {AssetType} from "./asset.type";
import {AssetIdentifierType} from "./asset.identifier.type";

export class AssetIdentifierAssignment {
  assetIdentifierAssignmentId: string;
  assetType: AssetType;
  assetIdentifierType: AssetIdentifierType;
  dateEffective: Date;
  dateUntil: Date;
}