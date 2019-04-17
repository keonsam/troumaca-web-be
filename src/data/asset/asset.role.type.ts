export class AssetRoleType {

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  assetRoleTypeId: string;
  name: string;
  canonicalName: string;
  description: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
