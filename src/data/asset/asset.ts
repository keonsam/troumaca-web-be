import {DiscreteItem} from "./discrete.item";
import {InventoryItem} from "./inventory.item";
import {Building} from "./building";
import {Lot} from "./lot";

export class Asset {
  assetId: string;
  ownerPartyId: string;
  name: string;
  createdOn: Date;
  destroyOn: Date;
  expireOn: Date;
  description: Date;
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
