import { CredentialStatus } from "./credential.status";

export class CredentialConfirmation {

  credentialConfirmationId: string;
  credentialId: string;
  confirmationCode: string;
  credentialStatus: CredentialStatus;
  modifiedOn: Date;
  createdOn: Date;
}
