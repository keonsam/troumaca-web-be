export class Billing {
  private _billingId: string;
  private _methodId: string;
  private _confirmed: boolean;
  private _type: string;

  get billingId(): string {
    return this._billingId;
  }

  set billingId(value: string) {
    this._billingId = value;
  }

  get methodId(): string {
    return this._methodId;
  }

  set methodId(value: string) {
    this._methodId = value;
  }

  get confirmed(): boolean {
    return this._confirmed;
  }

  set confirmed(value: boolean) {
    this._confirmed = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
