import { AssetCharacteristicType } from "./asset.characteristic.type";
import { UnitOfMeasurement } from "../unit-of-measurement/unit.of.measurement";

export class AssetCharacteristic {
  assetCharacteristicId: string;
  assetCharacteristicTypeId: string;
  assetCharacteristicType: AssetCharacteristicType;
  name: string;
  defaultValue: string;
  description: string;
  format: string;
  unitOfMeasurementId: string;
  unitOfMeasurement: UnitOfMeasurement;
  formula: string;
  calculationLevel: string;
  maximumValue: string;
  minimumValue: string;
  categoryValue: string;
  effectiveDate: string;
  untilDate: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
