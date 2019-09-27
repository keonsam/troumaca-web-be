import {Asset} from "./asset";
import {Page} from "../page/page";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Assets {
  @Field( () => [Asset])
  assets: Asset[] = [];
  page: Page;
  constructor(assets: Asset[], page?: Page) {
    this.assets = assets;
    this.page = page;
  }
}
