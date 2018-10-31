export class Result<T> {

  constructor(fail?: boolean, message?: string, data?: T) {
    this._fail = fail;
    this._message = message;
    this._data = data;
  }

  private _fail: boolean;

  get fail(): boolean {
    return this._fail;
  }

  set fail(value: boolean) {
    this._fail = value;
  }

  private _data: T;

  get data(): T {
    return this._data;
  }

  set data(value: T) {
    this._data = value;
  }

  private _message: string;

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}