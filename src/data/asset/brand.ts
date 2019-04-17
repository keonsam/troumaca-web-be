export class Brand {
  constructor(name: string, abbreviation: string, description: string) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.description = description;
  }
  brandId: string;
  name: string;
  ownerPartyId: string;
  abbreviation: string;
  description: string;
}
