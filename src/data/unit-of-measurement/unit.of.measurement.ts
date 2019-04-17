export class UnitOfMeasurement {

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  unitOfMeasurementId: string;
  name: string;
  symbol: string;
  description: string;
  unitOfMeasureDimensionId: string;
  unitOfMeasureSystemId: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
