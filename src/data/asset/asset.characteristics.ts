import {Page} from "../page/page";
import {AssetCharacteristic} from "./asset.characteristic";

export class AssetCharacteristics {


  constructor(assetCharacteristics: AssetCharacteristic[], page: Page) {
    this.assetCharacteristics = assetCharacteristics;
    this.page = page;
  }

  assetCharacteristics: AssetCharacteristic[] = [];
  page: Page;
}
