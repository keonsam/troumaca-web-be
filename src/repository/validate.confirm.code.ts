export class ValidateConfirmCode {
  credentialId: string;
  code: string;

  constructor(credentialId: string, code: string) {
    this.credentialId = credentialId;
    this.code = code;
  }
}