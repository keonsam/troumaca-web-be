import {AssetTypeClass} from "./asset.type.class";
import {AssignedAttribute} from "./assigned.attribute";

export class AssetTypeClassResponse {

  constructor(created?: boolean, assetTypeClass?: AssetTypeClass, assignedAttributes?: AssignedAttribute[]) {
    this._created = created;
    this._assetTypeClass = assetTypeClass;
    this._assignedAttributes = assignedAttributes;
  }

  private _created: boolean;

  get created(): boolean {
    return this._created;
  }

  set created(value: boolean) {
    this._created = value;
  }

  private _assetTypeClass: AssetTypeClass;

  get assetTypeClass(): AssetTypeClass {
    return this._assetTypeClass;
  }

  set assetTypeClass(value: AssetTypeClass) {
    this._assetTypeClass = value;
  }

  private _assignedAttributes: AssignedAttribute[];

  get assignedAttributes(): AssignedAttribute[] {
    return this._assignedAttributes;
  }

  set assignedAttributes(value: AssignedAttribute[]) {
    this._assignedAttributes = value;
  }

  toJson() {
    return {
      created: this.created,
      assetTypeClass: this.assetTypeClass,
      assignedAttributes: this.assignedAttributes
    };
  }
}
