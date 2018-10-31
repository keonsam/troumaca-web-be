export class Subscription {
  private _subscriptionId: string;

  get subscriptionId(): string {
    return this._subscriptionId;
  }

  set subscriptionId(value: string) {
    this._subscriptionId = value;
  }

  private _moduleId: string;

  get moduleId(): string {
    return this._moduleId;
  }

  set moduleId(value: string) {
    this._moduleId = value;
  }

  private _subscribed: boolean;

  get subscribed(): boolean {
    return this._subscribed;
  }

  set subscribed(value: boolean) {
    this._subscribed = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _cost: string;

  get cost(): string {
    return this._cost;
  }

  set cost(value: string) {
    this._cost = value;
  }
}
