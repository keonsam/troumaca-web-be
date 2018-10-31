export class UnitOfMeasure {

  constructor(unitOfMeasureId?: string, quantity?: string, name?: string, symbol?: string, factor?: string, otherSiBaseUnitsExpression?: string, siBaseUnitsExpression?: string) {
    this._unitOfMeasureId = unitOfMeasureId;
    this._quantity = quantity;
    this._name = name;
    this._symbol = symbol;
    this._factor = factor;
    this._otherSiBaseUnitsExpression = otherSiBaseUnitsExpression;
    this._siBaseUnitsExpression = siBaseUnitsExpression;
  }

  private _unitOfMeasureId: string;

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  private _quantity: string;

  get quantity(): string {
    return this._quantity;
  }

  set quantity(value: string) {
    this._quantity = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _symbol: string;

  get symbol(): string {
    return this._symbol;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  private _factor: string;

  get factor(): string {
    return this._factor;
  }

  set factor(value: string) {
    this._factor = value;
  }

  private _otherSiBaseUnitsExpression: string;

  get otherSiBaseUnitsExpression(): string {
    return this._otherSiBaseUnitsExpression;
  }

  set otherSiBaseUnitsExpression(value: string) {
    this._otherSiBaseUnitsExpression = value;
  }

  private _siBaseUnitsExpression: string;

  get siBaseUnitsExpression(): string {
    return this._siBaseUnitsExpression;
  }

  set siBaseUnitsExpression(value: string) {
    this._siBaseUnitsExpression = value;
  }
}
