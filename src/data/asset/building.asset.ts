import {Asset} from "./asset";

export class BuildingAsset extends Asset {

  buildingId: string;

  constructor() {
    super();
    this.typeName = "building";
  }

}
