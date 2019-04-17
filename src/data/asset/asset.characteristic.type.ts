export class AssetCharacteristicType {

  constructor(assetCharacteristicTypeId?: string, name?: string) {
    this.assetCharacteristicTypeId = assetCharacteristicTypeId;
    this.name = name;
  }

  assetCharacteristicTypeId: string;
  name: string;
  canonicalName: string;
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
