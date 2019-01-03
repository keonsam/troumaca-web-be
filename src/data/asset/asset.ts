import {DiscreteItem} from "./discrete.item";
import {InventoryItem} from "./inventory.item";
import {Building} from "./building";
import {Lot} from "./lot";
import {AssetSpecification} from "./asset.specification";
import {AssetBrand} from "./asset.brand";
import {AssetCharacteristics} from "./asset.characteristics";

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
  specification: AssetSpecification;
  brand: AssetBrand;
  characteristics: AssetCharacteristics;

  constructor() {
    this.discreteItem = new DiscreteItem();
    this.inventoryItem = new InventoryItem();
    this.building = new Building();
    this.lot = new Lot();
    this.specification = new AssetSpecification();
    this.brand = new AssetBrand();
    this.characteristics = new AssetCharacteristics();
  }

}
