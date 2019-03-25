export class AssetNameType {
  assetNameTypeId: string;
  name: string;
  canonicalName: string;
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
