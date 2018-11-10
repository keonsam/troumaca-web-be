import {AssetTypeClass} from "./asset.type.class";
import {AssignedAttribute} from "./assigned.attribute";

export class AssetTypeClassResponse {
  assetTypeClass: AssetTypeClass;
  assignedAttributes: AssignedAttribute[];
  constructor(assetTypeClass?: AssetTypeClass, assignedAttributes?: AssignedAttribute[]) {
    this.assetTypeClass = assetTypeClass;
    this.assignedAttributes = assignedAttributes;
  }
}
