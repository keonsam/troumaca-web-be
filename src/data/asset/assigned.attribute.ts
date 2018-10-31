export class AssignedAttribute {

  private _assignedAttributeId: string;

  get assignedAttributeId(): string {
    return this._assignedAttributeId;
  }

  set assignedAttributeId(value: string) {
    this._assignedAttributeId = value;
  }

  private _dataTypeId: string;

  get dataTypeId(): string {
    return this._dataTypeId;
  }

  set dataTypeId(value: string) {
    this._dataTypeId = value;
  }

  private _assetTypeClassId: string;

  get assetTypeClassId(): string {
    return this._assetTypeClassId;
  }

  set assetTypeClassId(value: string) {
    this._assetTypeClassId = value;
  }

  private _attributeId: string;

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  private _attributeName: string;

  get attributeName(): string {
    return this._attributeName;
  }

  set attributeName(value: string) {
    this._attributeName = value;
  }

  private _dataTypeName: string;

  get dataTypeName(): string {
    return this._dataTypeName;
  }

  set dataTypeName(value: string) {
    this._dataTypeName = value;
  }

  private _required: boolean;

  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = value;
  }

  private _createdOn: string;

  get createdOn(): string {
    return this._createdOn;
  }

  set createdOn(value: string) {
    this._createdOn = value;
  }

  private _modifiedOn: string;

  get modifiedOn(): string {
    return this._modifiedOn;
  }

  set modifiedOn(value: string) {
    this._modifiedOn = value;
  }
}
