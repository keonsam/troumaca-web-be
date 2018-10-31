import {Observable} from "rxjs";
import {PaymentMethod} from "../billing/payment.method";
import {CreditCard} from "../billing/credit.card";
import {Billing} from "../billing/billing";

export interface BillingRepository {

  getPaymentMethods(): Observable<PaymentMethod[]>;

  addCreditCard(creditCard: CreditCard): Observable<CreditCard>;

  getBillings(): Observable<Billing[]>;

  getCreditCards(): Observable<CreditCard[]>;

  updateCreditCard(creditCard: CreditCard, creditCardId: string): Observable<number>;

  deleteCreditCard(creditCardId: string): Observable<number>;

  // getBilling(): Observable<Billing>;
  //
  // addBilling(billing: Billing, method: any): Observable<Billing>;
  //
  // updateBilling(billingId: string, billing: Billing, method: any): Observable<number>;

  // CREDIT CARD

  cardName(value: string): Observable<boolean>;

  cardNumber(value: string): Observable<boolean>;

  cardExpDate(value: Date): Observable<boolean>;

  cardCVV(value: string): Observable<boolean>;
}