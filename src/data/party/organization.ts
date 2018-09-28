import { Party } from "./party";

export class Organization extends Party {

  private _name: string;
  private _purpose: string;
  private _description: string;

  get  name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get purpose(): string {
    return this._purpose;
  }

  set purpose(value: string) {
    this._purpose = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

}
