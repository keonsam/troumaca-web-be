import {Page} from "../page/page";
import { AssetRoleType } from "./asset.role.type";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class AssetRoleTypes {

  constructor(assetRoleTypes: AssetRoleType[], page: Page) {
    this.assetRoleTypes = assetRoleTypes;
    this.page = page;
  }

  @Field(() => [AssetRoleType])
  assetRoleTypes: AssetRoleType[] = [];
  page: Page;
}
