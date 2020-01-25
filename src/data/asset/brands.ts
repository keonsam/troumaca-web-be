import {Page} from "../page/page";
import {Brand} from "./brand";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Brands {
  @Field( () => [Brand])
  brands: Brand[] = [];
  page: Page;
  constructor(brands: Brand[], page: Page) {
    this.brands = brands;
    this.page = page;
  }
}
