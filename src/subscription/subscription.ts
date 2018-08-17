export class Subscription {
  private _subscriptionId: string;
  private _subscribed: boolean;
  private _type: string;

  get subscriptionId(): string {
    return this._subscriptionId;
  }

  set subscriptionId(value: string) {
    this._subscriptionId = value;
  }

  get subscribed(): boolean {
    return this._subscribed;
  }

  set subscribed(value: boolean) {
    this._subscribed = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
