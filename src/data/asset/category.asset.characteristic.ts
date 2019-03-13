import {AssetCharacteristic} from "./asset.characteristic";
import {AssetCategoryLegalValue} from "./asset.category.legal.value";

export class CategoryAssetCharacteristic extends AssetCharacteristic {
  assetCharacteristicId: string;
  assetCategoryLegalValues: AssetCategoryLegalValue[];
}