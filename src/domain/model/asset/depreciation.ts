export class Depreciation {
  private _depreciationId: string;

  get depreciationId(): string {
    return this._depreciationId;
  }

  set depreciationId(value: string) {
    this._depreciationId = value;
  }

  private _assetId: string;

  get assetId(): string {
    return this._assetId;
  }

  set assetId(value: string) {
    this._assetId = value;
  }

  private _assetName: string;

  get assetName(): string {
    return this._assetName;
  }

  set assetName(value: string) {
    this._assetName = value;
  }

  private _systemId: string;

  get systemId(): string {
    return this._systemId;
  }

  set systemId(value: string) {
    this._systemId = value;
  }

  private _propertyClassId: string;

  get propertyClassId(): string {
    return this._propertyClassId;
  }

  set propertyClassId(value: string) {
    this._propertyClassId = value;
  }

  private _methodId: string;

  get methodId(): string {
    return this._methodId;
  }

  set methodId(value: string) {
    this._methodId = value;
  }

  private _purchaseDate: string;

  get purchaseDate(): string {
    return this._purchaseDate;
  }

  set purchaseDate(value: string) {
    this._purchaseDate = value;
  }

  private _serviceDate: string;

  get serviceDate(): string {
    return this._serviceDate;
  }

  set serviceDate(value: string) {
    this._serviceDate = value;
  }

  private _cost: string;

  get cost(): string {
    return this._cost;
  }

  set cost(value: string) {
    this._cost = value;
  }

  private _salvageVal: string;

  get salvageVal(): string {
    return this._salvageVal;
  }

  set salvageVal(value: string) {
    this._salvageVal = value;
  }

  private _usefulLife: string;

  get usefulLife(): string {
    return this._usefulLife;
  }

  set usefulLife(value: string) {
    this._usefulLife = value;
  }

  private _unitProduced: string[] = [];

  get unitProduced(): string[] {
    return this._unitProduced;
  }

  set unitProduced(value: string[]) {
    this._unitProduced = value;
  }

  private _totalUnits: string;

  get totalUnits(): string {
    return this._totalUnits;
  }

  set totalUnits(value: string) {
    this._totalUnits = value;
  }

  private _currentDepreciation: string;

  get currentDepreciation(): string {
    return this._currentDepreciation;
  }

  set currentDepreciation(value: string) {
    this._currentDepreciation = value;
  }

  private _cumulativeDepreciation: string;

  get cumulativeDepreciation(): string {
    return this._cumulativeDepreciation;
  }

  set cumulativeDepreciation(value: string) {
    this._cumulativeDepreciation = value;
  }

  private _bookValue: string;

  get bookValue(): string {
    return this._bookValue;
  }

  set bookValue(value: string) {
    this._bookValue = value;
  }

  private _methodName: string;

  get methodName(): string {
    return this._methodName;
  }

  set methodName(value: string) {
    this._methodName = value;
  }

  private _depreciationSystemName: string;

  get depreciationSystemName(): string {
    return this._depreciationSystemName;
  }

  set depreciationSystemName(value: string) {
    this._depreciationSystemName = value;
  }

  private _propertyClassName: string;

  get propertyClassName(): string {
    return this._propertyClassName;
  }

  set propertyClassName(value: string) {
    this._propertyClassName = value;
  }
}
