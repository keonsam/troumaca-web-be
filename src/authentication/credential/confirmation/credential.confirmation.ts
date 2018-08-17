import { CredentialStatus } from "../credential.status";

export class CredentialConfirmation {

  private _credentialConfirmationId: string;
  private _credentialId: string;
  private _confirmationCode: string;
  private _credentialStatus: CredentialStatus;
  private _modifiedOn: Date;
  private _createdOn: Date;

  get credentialConfirmationId(): string {
    return this._credentialConfirmationId;
  }

  set credentialConfirmationId(value: string) {
    this._credentialConfirmationId = value;
  }

  get credentialId(): string {
    return this._credentialId;
  }

  set credentialId(value: string) {
    this._credentialId = value;
  }

  get confirmationCode(): string {
    return this._confirmationCode;
  }

  set confirmationCode(value: string) {
    this._confirmationCode = value;
  }

  get credentialStatus(): CredentialStatus {
    return this._credentialStatus;
  }

  set credentialStatus(value: CredentialStatus) {
    this._credentialStatus = value;
  }

  get modifiedOn(): Date {
    return this._modifiedOn;
  }

  set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  toJson() {
    return {
      credentialConfirmationId: this.credentialConfirmationId,
      credentialId: this.credentialId,
      confirmationCode: this.confirmationCode,
      credentialStatus: this.credentialStatus,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    };
  }
}
