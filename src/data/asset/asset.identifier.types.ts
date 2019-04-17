import {Page} from "../page/page";
import { AssetIdentifierType } from "./asset.identifier.type";

export class AssetIdentifierTypes {

  constructor(assetIdentifierTypes: AssetIdentifierType[], page: Page) {
    this.assetIdentifierTypes = assetIdentifierTypes;
    this.page = page;
  }
  assetIdentifierTypes: AssetIdentifierType[] = [];
  page: Page;
}
