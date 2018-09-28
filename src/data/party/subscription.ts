export class Subscription {
    private _subscriptionId: string;
    private _moduleId: string;
    private _subscribed: boolean;
    private _name: string;
    private _cost: string;

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


  get moduleId(): string {
        return this._moduleId;
  }

  set moduleId(value: string) {
        this._moduleId = value;
  }

  get name(): string {
        return this._name;
  }

  set name(value: string) {
        this._name = value;
  }

  get cost(): string {
        return this._cost;
  }

  set cost(value: string) {
      this._cost = value;
  }
}
