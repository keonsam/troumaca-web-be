export class Attribute {

  private _attributeId: string;
  private _tenantId: string;
  private _name: string;
  private _format: string;
  // replace with data type
  private _dataTypeId: string;
  // replace with unit of measure
  private _unitOfMeasureId: string;
  private _unitOfMeasureName: string;
  private _dataTypeName: string;
  private _maximumValue: string;
  private _minimumValue: string;
  private _createdOn: Date;
  private _modifiedOn: Date;

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  get dataTypeId(): string {
    return this._dataTypeId;
  }

  set dataTypeId(value: string) {
    this._dataTypeId = value;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get maximumValue(): string {
    return this._maximumValue;
  }

  set maximumValue(value: string) {
    this._maximumValue = value;
  }

  get minimumValue(): string {
    return this._minimumValue;
  }

  set minimumValue(value: string) {
    this._minimumValue = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

  get unitOfMeasureName(): string {
    return this._unitOfMeasureName;
  }

  set unitOfMeasureName(value: string) {
    this._unitOfMeasureName = value;
  }


  get dataTypeName(): string {
    return this._dataTypeName;
  }

  set dataTypeName(value: string) {
    this._dataTypeName = value;
  }

}
