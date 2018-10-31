import {AssetType} from "./asset.type";
import {Value} from "./value";

export class AssetTypeResponse {

  constructor(assetType: AssetType, values: Value[]) {
    this._assetType = assetType;
    this._values = values;
  }

  private _assetType: AssetType;

  get assetType(): AssetType {
    return this._assetType;
  }

  set assetType(value: AssetType) {
    this._assetType = value;
  }

  private _values: Value[];

  get values(): Value[] {
    return this._values;
  }

  set values(value: Value[]) {
    this._values = value;
  }

  toJson() {
    return {
      assetType: this.assetType,
      values: this.values
    };
  }
}
