export class ValidatedUsername {

  private _valid:boolean;

  constructor(valid?: boolean) {
    this._valid = valid;
  }

  get valid(): boolean {
    return this._valid;
  }

  set valid(value: boolean) {
    this._valid = value;
  }
}