import {Asset} from "./asset";

export class InventoryItemAsset extends Asset {

  inventoryId: string;
  quantity: number;

  constructor() {
    super();
    this.typeName = "inventory";
  }

}
