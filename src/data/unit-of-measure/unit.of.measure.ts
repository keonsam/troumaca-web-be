export class UnitOfMeasure {

  private _unitOfMeasureId: string;
  private _quantity: string;
  private _name: string;
  private _symbol: string;
  private _factor: string;
  private _otherSiBaseUnitsExpression: string;
  private _siBaseUnitsExpression: string;

  constructor(unitOfMeasureId?: string, quantity?: string, name?: string, symbol?: string, factor?: string, otherSiBaseUnitsExpression?: string, siBaseUnitsExpression?: string) {
    this._unitOfMeasureId = unitOfMeasureId;
    this._quantity = quantity;
    this._name = name;
    this._symbol = symbol;
    this._factor = factor;
    this._otherSiBaseUnitsExpression = otherSiBaseUnitsExpression;
    this._siBaseUnitsExpression = siBaseUnitsExpression;
  }

  get unitOfMeasureId(): string {
    return this._unitOfMeasureId;
  }

  set unitOfMeasureId(value: string) {
    this._unitOfMeasureId = value;
  }

  get quantity(): string {
    return this._quantity;
  }

  set quantity(value: string) {
    this._quantity = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get symbol(): string {
    return this._symbol;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  get factor(): string {
    return this._factor;
  }

  set factor(value: string) {
    this._factor = value;
  }

  get otherSiBaseUnitsExpression(): string {
    return this._otherSiBaseUnitsExpression;
  }

  set otherSiBaseUnitsExpression(value: string) {
    this._otherSiBaseUnitsExpression = value;
  }

  get siBaseUnitsExpression(): string {
    return this._siBaseUnitsExpression;
  }

  set siBaseUnitsExpression(value: string) {
    this._siBaseUnitsExpression = value;
  }
}
