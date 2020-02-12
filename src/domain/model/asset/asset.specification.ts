import {AssetType} from "./asset.type";
import {Field, ID} from "type-graphql";

export class AssetSpecification extends AssetType {
  @Field({nullable: true})
  brandId: string;
  @Field({nullable: true})
  modelNumber: string;
  @Field({nullable: true})
  standardPrice: number;
  @Field({nullable: true})
  dateEffective: Date;

  constructor() {
    super();
    this.specification = true;
  }
}
