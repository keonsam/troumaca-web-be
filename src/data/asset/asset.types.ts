import {AssetType} from "./asset.type";
import {Page} from "../page/page";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AssetTypes {
  // @Field(() => [AssetType])
  // assetTypes: AssetType[] = [];
  @Field(() => [AssetType])
  recent: AssetType[];
  @Field(() => [AssetType])
  recommended: AssetType[];
  page: Page;
  constructor(assetTypes: AssetType[]) {
    this.recent = assetTypes;
    this.recommended = assetTypes;
  }
}
