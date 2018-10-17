export class Session {

  sessionId: string;
  partyId: string;
  credentialId: string;
  customerId: string;
  expirationTime: Date;
  createdOn: Date;
  modifiedOn: Date;
  username: string;
  data: Map<String, Object>;


  constructor(sessionId?: string, credentialId?: string, customerId?: string, expirationTime?: Date, createdOn?: Date, modifiedOn?: Date, data?: Map<String, Object>) {
    this.sessionId = sessionId;
    this.credentialId = credentialId;
    this.customerId = customerId;
    this.expirationTime = expirationTime;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    if (data) {
      this.data = data;
    } else {
      this.data = new Map<String, Object>();
    }
  }

}
