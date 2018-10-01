import { Credential } from "./credential";
import { Confirmation } from "./confirmation";

export class CreatedCredential {

  private _eventName:string;
  private _firstName:string;
  private _lastName:string;
  private _credential: Credential;
  private _confirmation: Confirmation;

  get eventName(): string {
    return this._eventName;
  }

  set eventName(value: string) {
    this._eventName = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get credential(): Credential {
    return this._credential;
  }

  set credential(value: Credential) {
    this._credential = value;
  }

  get confirmation(): Confirmation {
    return this._confirmation;
  }

  set confirmation(value: Confirmation) {
    this._confirmation = value;
  }

}
