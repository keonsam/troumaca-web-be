import {AssetRoleType} from "./asset.role.type";
import {Asset} from "./asset";
import {AssetType} from "./asset.type";

export class AssetRole {
  assetRoleId: string;
  assetRoleType: AssetRoleType;
  partyId: string;
  assetId: Asset;
  assetTypeId: AssetType;
  description: string;
  dateEffective: Date;
  dateUntil: Date;
  version: string;
  ownerPartyId: string;
  dateModified: Date;

  constructor() {
  }

}