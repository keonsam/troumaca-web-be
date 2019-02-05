import {AssetType} from "./asset.type";

export class AssetSpecification extends AssetType {

  modelNumber: string;
  standardPrice: number;
  dateEffective: Date;

  constructor() {
    super();
    this.specification = true;
  }
}
