import {DiscreteItem} from "./discrete.item";
import {InventoryItem} from "./inventory.item";
import {Building} from "./building";
import {Lot} from "./lot";

export class Asset {
  assetId: string;
  name: string;
  createdOn: string;
  destroyOn: string;
  expireOn: string;
  description: string;
  discreteItem: DiscreteItem;
  inventoryItem: InventoryItem;
  building: Building;
  lot: Lot;

  constructor() {
    this.discreteItem = new DiscreteItem();
    this.inventoryItem = new InventoryItem();
    this.building = new Building();
    this.lot = new Lot();
  }

}
