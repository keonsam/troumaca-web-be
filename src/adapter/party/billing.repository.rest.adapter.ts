import {BillingRepository} from "../../repository/billing.repository";
import {Observable} from "rxjs";
import {PaymentMethod} from "../../billing/payment.method";
import {CreditCard} from "../../billing/credit.card";
import {Billing} from "../../billing/billing";

export class BillingRepositoryRestAdapter implements BillingRepository {

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return undefined;
  }

  addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return undefined;
  }

  getBillings(): Observable<Billing[]> {
    return undefined;
  }

  getCreditCards(): Observable<CreditCard[]> {
    return undefined;
  }

  updateCreditCard(creditCard: CreditCard, creditCardId: string): Observable<number> {
    return undefined;
  }

  deleteCreditCard(creditCardId: string): Observable<number> {
    return undefined;
  }

  // public getBilling(): Observable<Billing> {
  //     return undefined;
  // }
  //
  // public addBilling(billing: Billing, method: any): Observable<Billing> {
  //     return undefined;
  // }
  //
  // public updateBilling(billingId: string, billing: Billing, method: any): Observable<number> {
  //     return undefined;
  // }

  // CREDIT CARD

  public cardName(value: string): Observable<boolean> {
    return undefined;
  }

  public cardNumber(value: string): Observable<boolean> {
    return undefined;
  }

  public cardExpDate(value: Date): Observable<boolean> {
    return undefined;
  }

  public cardCVV(value: string): Observable<boolean> {
    return undefined;
  }
}