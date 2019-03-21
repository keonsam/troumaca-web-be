export class Credential {
  ownerPartyId: string;
  partyId: string;
  credentialId: string;
  username: string;
  password: string;
  status: string;
  modifiedOn: Date;
  createdOn: Date;
  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }
}
