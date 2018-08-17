export class Result<T> {

  private _fail: boolean;
  private _data: T;
  private _message: string;

  constructor(fail?: boolean, message?: string, data?: T) {
    this._fail = fail;
    this._message = message;
    this._data = data;
  }

  get fail(): boolean {
    return this._fail;
  }

  set fail(value: boolean) {
    this._fail = value;
  }

  get data(): T {
    return this._data;
  }

  set data(value: T) {
    this._data = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}