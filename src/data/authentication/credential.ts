export class Credential {
  ownerPartyId: string;
  partyId: string;
  credentialId: string;
  username: string;
  companyName: string;
  confirmedPassword: string;
  accountType: string;
  usernameType: string;
  password: string;
  status: string;
  modifiedOn: Date;
  createdOn: Date;

  constructor(username: string, companyName: string, accountType: string, usernameType: string, password: string, confirmedPassword: string) {
    this.username = username;
    this.companyName = companyName;
    this.accountType = accountType;
    this.usernameType = usernameType;
    this.password = password;
    this.confirmedPassword = confirmedPassword;
  }
}
