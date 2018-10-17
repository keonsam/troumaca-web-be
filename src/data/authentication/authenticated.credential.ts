export class AuthenticatedCredential {

  credentialId: string;
  username: string;
  authenticateStatus: string;
  confirmationId: string;
  partyId: string;
  sessionId: string;

  constructor(credentialId?: string) {
    this.credentialId = credentialId;
  }

}