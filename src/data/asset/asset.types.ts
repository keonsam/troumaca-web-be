import {AssetType} from "./asset.type";
import {Page} from "../page/page";

export class AssetTypes {

  constructor(assetTypes: AssetType[], page: Page) {
    this.assetTypes = assetTypes;
    this.page = page;
  }

  assetTypes: AssetType[] = [];
  page: Page;
}
