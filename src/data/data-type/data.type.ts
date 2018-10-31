export class DataType {

  private _dataTypeId: string;

  get dataTypeId(): string {
    return this._dataTypeId;
  }

  set dataTypeId(value: string) {
    this._dataTypeId = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

}