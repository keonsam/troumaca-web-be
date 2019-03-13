import {Asset} from "./asset";

export class Inventory extends Asset {

  inventoryId: string;
  quantity: number;

  constructor() {
    super();
  }

}
