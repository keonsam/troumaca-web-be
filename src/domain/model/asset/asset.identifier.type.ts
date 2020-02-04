export class AssetIdentifierType {

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  assetIdentifierTypeId: string;
  name: string;
  canonicalName: string;
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
