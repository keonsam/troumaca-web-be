import {Page} from "../page/page";
import {Brand} from "./brand";

export class Brands {

  constructor(brands: Brand[], page: Page) {
    this.brands = brands;
    this.page = page;
  }

  brands: Brand[] = [];
  page: Page;
}
