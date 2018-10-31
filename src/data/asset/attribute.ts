export class Attribute {

  private _attributeId: string;

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  private _tenantId: string;

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _format: string;

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  // replace with data type
  private _dataTypeId: string;

  get dataTypeId(): string {
    return this._dataTypeId;
  }

  set dataTypeId(value: string) {
    this._dataTypeId = value;
  }

  // replace with unit of measure
  private _unitOfMeasureId: string;

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  private _unitOfMeasureName: string;

  get unitOfMeasureName(): string {
    return this._unitOfMeasureName;
  }

  set unitOfMeasureName(value: string) {
    this._unitOfMeasureName = value;
  }

  private _dataTypeName: string;

  get dataTypeName(): string {
    return this._dataTypeName;
  }

  set dataTypeName(value: string) {
    this._dataTypeName = value;
  }

  private _maximumValue: string;

  get maximumValue(): string {
    return this._maximumValue;
  }

  set maximumValue(value: string) {
    this._maximumValue = value;
  }

  private _minimumValue: string;

  get minimumValue(): string {
    return this._minimumValue;
  }

  set minimumValue(value: string) {
    this._minimumValue = value;
  }

  private _createdOn: Date;

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  private _modifiedOn: Date;

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

}
