export class Asset {

  private _assetId: string;
  private _tenantId: string;
  private _assetKindId: string;
  private _assetKindName: string;
  private _assetTypeId: string;
  private _assetTypeName: string;
  private _serialNumber: string;
  private _quantity: string;
  private _unitOfMeasureId: string;
  private _unitOfMeasureName: string;
  private _description: string;
  private _personId: string;
  private _personName: string;
  private _siteId: string;
  private _siteName: string;
  private _createdOn: string;
  private _modifiedOn: string;


  constructor() {
  }

  get assetId(): string {
    return this._assetId;
  }

  set assetId(value: string) {
    this._assetId = value;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }

  get assetKindId(): string {
    return this._assetKindId;
  }

  set assetKindId(value: string) {
    this._assetKindId = value;
  }

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  set serialNumber(value: string) {
    this._serialNumber = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get quantity(): string {
    return this._quantity;
  }

  set quantity(value: string) {
    this._quantity = value;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get personId(): string {
    return  this._personId;
  }

  set personId(value: string) {
    this._personId = value;
  }

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
  }

  get createdOn(): string {
    return this._createdOn;
  }

  set createdOn(value: string) {
    this._createdOn = value;
  }

  get modifiedOn(): string {
    return this._modifiedOn;
  }

  set modifiedOn(value: string) {
    this._modifiedOn = value;
  }

  get assetKindName(): string {
    return this._assetKindName;
  }

  set assetKindName(value: string) {
    this._assetKindName = value;
  }

  get assetTypeName(): string {
    return this._assetTypeName;
  }

    set assetTypeName(value: string) {
        this._assetTypeName = value;
    }

    get unitOfMeasureName(): string {
        return this._unitOfMeasureName;
    }

    set unitOfMeasureName(value: string) {
        this._unitOfMeasureName = value;
    }

    get personName(): string {
        return this._personName;
    }

    set personName(value: string) {
        this._personName = value;
    }

    get siteName(): string {
        return this._siteName;
    }

    set siteName(value: string) {
        this._siteName = value;
    }
}
