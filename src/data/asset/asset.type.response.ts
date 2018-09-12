import { AssetType } from "./asset.type";
import { Value } from "./value";

export class AssetTypeResponse {

  private _assetType: AssetType;
  private _values: Value[];

  constructor(assetType: AssetType, values: Value[]) {
      this._assetType = assetType;
      this._values = values;
  }

  get assetType(): AssetType {
    return this._assetType;
  }

  set assetType(value: AssetType) {
    this._assetType = value;
  }

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
