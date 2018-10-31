export class Value {

  constructor(attributeId?: string, text?: string) {
    this._attributeId = attributeId;
    this._text = text;
  }

  private _valueId: string;

  get valueId(): string {
    return this._valueId;
  }

  set valueId(value: string) {
    this._valueId = value;
  }

  private _tenantId: string;

  get tenantId(): string {
    return this._tenantId;
  }

  set tenantId(value: string) {
    this._tenantId = value;
  }

  private _assetTypeId: string;

  get assetTypeId(): string {
    return this._assetTypeId;
  }

  set assetTypeId(value: string) {
    this._assetTypeId = value;
  }

  private _attributeId: string;

  get attributeId(): string {
    return this._attributeId;
  }

  set attributeId(value: string) {
    this._attributeId = value;
  }

  private _text: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _createOn: string;

  get createOn(): string {
    return this._createOn;
  }

  set createOn(value: string) {
    this._createOn = value;
  }

  private _modifiedOn: string;

  get modifiedOn(): string {
    return this._modifiedOn;
  }

  set modifiedOn(value: string) {
    this._modifiedOn = value;
  }

}
