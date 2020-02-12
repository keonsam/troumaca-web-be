export class AssignedCharacteristic {
  assetCharacteristicId: string;
  assetCharacteristic: AssignedCharacteristic;
  name: string;
  effectiveDate: Date;
  untilDate: Date;
  optional: boolean;
  unitOfMeasureId: string;
  maxValue: string;
  minValue: string;
  value: string;
}
