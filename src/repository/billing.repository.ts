import { Billing } from "../data/party/billing";
import { Observable } from "rxjs";

export interface BillingRepository {

    getBilling(): Observable<Billing>;

    addBilling(billing: Billing, method: any): Observable<Billing>;

    updateBilling(billingId: string, billing: Billing, method: any): Observable<number>;

    // CREDIT CARD

    cardName(value: string): Observable<boolean>;

    cardNumber(value: string): Observable<boolean>;

    cardExpDate(value: Date): Observable<boolean>;

    cardCVV(value: string): Observable<boolean>;
}