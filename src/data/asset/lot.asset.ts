import {Asset} from "./asset";

export class LotAsset extends Asset {

  lotNumber: string;
  numberOfShares: number;

  constructor() {
    super();
    this.typeName = "lot";
  }

}
