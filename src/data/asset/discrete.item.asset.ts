import {Asset} from "./asset";

export class DiscreteItemAsset extends Asset {

  serialNumber: string;

  constructor() {
    super();
    this.typeName = "discreteItem";
  }

}
