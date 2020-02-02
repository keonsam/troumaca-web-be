export class Credential {
  ownerPartyId: string;
  partyId: string;
  credentialId: string;
  username: string;
  companyName: string;
  password: string;
  status: string;
  modifiedOn: Date;
  createdOn: Date;

  constructor(username: string, companyName: string, password: string) {
    this.username = username;
    this.companyName = companyName;
    this.password = password;
  }
}
