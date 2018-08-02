export class ValidatedPassword {
  private _valid: boolean;


  get valid(): boolean {
    return this._valid;
  }

  set valid(value: boolean) {
    this._valid = value;
  }
}