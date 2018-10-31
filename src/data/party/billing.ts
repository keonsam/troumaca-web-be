import { Party } from "./party";

export class Billing extends Party {
  billingId: string;
  name: string;
  description: string;
  amount: string;
}
