import {AssetCharacteristic} from "./asset.characteristic";
import {AssetSite} from "./asset.site";
import {AssetName} from "./asset.name";
import {AssetIdentifier} from "./asset.identifier";
import {AssetRole} from "./asset.role";
import {AssetType} from "./asset.type";

export class Asset {

  assetId: string;
  typeName: String;
  assetType: AssetType;
  name: string;
  description: string;
  dateOfCreation: Date;
  dateOfDestruction: Date;
  assetSite: AssetSite;
  partOfAssets: Asset[];
  composedOfAssets: Asset[];
  assetCharacteristics: AssetCharacteristic[];
  assetNames: AssetName[];
  assetIdentifiers: AssetIdentifier[];
  assetRoles: AssetRole[];

}
