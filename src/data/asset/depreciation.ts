export class Depreciation {
    private _depreciationId: string;
    private _assetId: string;
    private _assetName: string;
    private _systemId: string;
    private _propertyClassId: string;
    private _methodId: string;
    private _purchaseDate: string;
    private _serviceDate: string;
    private _cost: string;
    private _salvageVal: string;
    private _usefulLife: string;
    private _unitProduced: string[] = [];
    private _totalUnits: string;
    private _currentDepreciation: string;
    private _cumulativeDepreciation: string;
    private _bookValue: string;
    private _methodName: string;
    private _depreciationSystemName: string;
    private _propertyClassName: string;

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

  get methodId(): string {
    return this._methodId;
  }

  set methodId(value: string) {
    this._methodId = value;
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

  get methodName(): string {
    return this._methodName;
  }

  set methodName(value: string) {
    this._methodName = value;
  }

  get currentDepreciation(): string {
    return this._currentDepreciation;
  }

  set currentDepreciation(value: string) {
    this._currentDepreciation = value;
  }

  get cumulativeDepreciation(): string {
    return this._cumulativeDepreciation;
  }

  set cumulativeDepreciation(value: string) {
    this._cumulativeDepreciation = value;
  }

  get bookValue(): string {
    return this._bookValue;
  }

  set bookValue(value: string) {
    this._bookValue = value;
  }


  get systemId(): string {
    return this._systemId;
  }

  set systemId(value: string) {
    this._systemId = value;
  }

  get propertyClassId(): string {
    return this._propertyClassId;
  }

  set propertyClassId(value: string) {
    this._propertyClassId = value;
  }

  get serviceDate(): string {
    return this._serviceDate;
  }

  set serviceDate(value: string) {
    this._serviceDate = value;
  }

  get depreciationSystemName(): string {
    return this._depreciationSystemName;
  }

  set depreciationSystemName(value: string) {
    this._depreciationSystemName = value;
  }

  get propertyClassName(): string {
    return this._propertyClassName;
  }

  set propertyClassName(value: string) {
    this._propertyClassName = value;
  }
}
