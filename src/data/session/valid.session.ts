export class ValidSession {
  constructor(valid?: boolean) {
    this.valid = valid;
  }
  valid: boolean;
  partyId: string;
  ownerPartyId: string;
}
