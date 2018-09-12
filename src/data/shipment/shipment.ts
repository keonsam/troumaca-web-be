export  class Shipment {
  private _shipmentId: string;

  get shipmentId(): string {
    return this._shipmentId;
  }

  set shipmentId(value: string) {
    this._shipmentId = value;
  }
}
