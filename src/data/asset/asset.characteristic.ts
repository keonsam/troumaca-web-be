import {AssetCharacteristicValue} from "./asset.characteristic.value";
import {AssetCharacteristicType} from "./asset.characteristic.type";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";

export class AssetCharacteristic {
  assetCharacteristicId: string;
  assetCharacteristicType: AssetCharacteristicType;
  name: string;
  description: string;
  assetCharacteristicValue: AssetCharacteristicValue;
  format: string;
  unitOfMeasure: UnitOfMeasure;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
