export class Value {

  private _valueId: string;
  private _tenantId: string;
  private _assetTypeId: string;
  private _attributeId: string;
  private _text: string;
  private _createOn: string;
  private _modifiedOn: string;

  constructor( attributeId?: string, text?: string) {
    this._attributeId = attributeId;
    this._text = text;
  }

  get valueId(): string {
    return this._valueId;
  }

  set valueId(value: string) {
    this._valueId = value;
  }

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get createOn(): string {
    return this._createOn;
  }

  set createOn(value: string) {
    this._createOn = value;
  }

  get modifiedOn(): string {
    return this._modifiedOn;
  }

  set modifiedOn(value: string) {
    this._modifiedOn = value;
  }

}
