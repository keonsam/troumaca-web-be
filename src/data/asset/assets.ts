import {Asset} from "./asset";
import {Page} from "../page/page";

export class Assets {

  constructor(assets: Asset[], page: Page) {
    this.assets = assets;
    this.page = page;
  }

  assets: Asset[] = [];
  page: Page;
}
