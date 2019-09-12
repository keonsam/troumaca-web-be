import {Page} from "../page/page";
import {AssetCharacteristic} from "./asset.characteristic";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AssetCharacteristics {
  @Field(() => [AssetCharacteristic])
  assetCharacteristics: AssetCharacteristic[] = [];
  page: Page;

  constructor(assetCharacteristics: AssetCharacteristic[], page?: Page) {
    this.assetCharacteristics = assetCharacteristics;
    this.page = page;
  }
}
