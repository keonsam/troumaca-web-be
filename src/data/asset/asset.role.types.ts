import {Page} from "../page/page";
import { AssetRoleType } from "./asset.role.type";

export class AssetRoleTypes {

  constructor(assetRoleTypes: AssetRoleType[], page: Page) {
    this.assetRoleTypes = assetRoleTypes;
    this.page = page;
  }

  assetRoleTypes: AssetRoleType[] = [];
  page: Page;
}
