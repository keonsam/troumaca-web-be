export class Depreciation {
  private _depreciationId: string;
  private _assetId: string;
  private _method: string;
  private _purchaseDate: string;
  private _cost: string;
  private _salvageVal: string;
  private _usefulLife: string;
  private _unitProduced: string[] = [];
  private _totalUnits: string;
  private _assetName: string;

  get depreciationId(): string {
    return this._depreciationId;
  }

  set depreciationId(value: string) {
    this._depreciationId = value;
  }

  get assetId(): string {
    return this._assetId;
  }

  set assetId(value: string) {
    this._assetId = value;
  }

  get method(): string {
    return this._method;
  }

  set method(value: string) {
    this._method = value;
  }

  get purchaseDate(): string {
    return this._purchaseDate;
  }

  set purchaseDate(value: string) {
    this._purchaseDate = value;
  }

  get cost(): string {
    return this._cost;
  }

  set cost(value: string) {
    this._cost = value;
  }

  get salvageVal(): string {
    return this._salvageVal;
  }

  set salvageVal(value: string) {
    this._salvageVal = value;
  }

  get usefulLife(): string {
    return this._usefulLife;
  }

  set usefulLife(value: string) {
    this._usefulLife = value;
  }

  get unitProduced(): string[] {
    return this._unitProduced;
  }

  set unitProduced(value: string[]) {
    this._unitProduced = value;
  }

  get totalUnits(): string {
    return this._totalUnits;
  }

  set totalUnits(value: string) {
    this._totalUnits = value;
  }

  get assetName(): string {
    return this._assetName;
  }

  set assetName(value: string) {
    this._assetName = value;
  }
}
