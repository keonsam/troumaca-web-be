import {AssetCharacteristic} from "./asset.characteristic";

export class ContinuousAssetCharacteristic extends AssetCharacteristic {
  maximumValue: string;
  minimumValue: string;
  formula: string;
  calculationLevel: string;
}