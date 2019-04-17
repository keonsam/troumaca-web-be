export class Sort {

  private _direction: string;
  private _attributes: string[];

  get direction(): string {
    return this._direction;
  }

  set direction(value: string) {
    this._direction = value;
  }

  get attributes(): string[] {
    return this._attributes;
  }

  set attributes(value: string[]) {
    this._attributes = value;
  }

}
