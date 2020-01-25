import {AssetType} from "./asset.type";
import {Page} from "../page/page";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AssetTypes {
  // @Field(() => [AssetType])
  // assetTypes: AssetType[] = [];
  @Field(() => [AssetType])
  assetTypes: AssetType[];
  page: Page;
  constructor(assetTypes: AssetType[]) {
    this.assetTypes = assetTypes;
  }
}
