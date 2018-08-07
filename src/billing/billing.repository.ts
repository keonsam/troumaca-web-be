import { Observable } from "rxjs/Observable";
import { Billing } from "./billing";

export interface BillingRepository {

    getBilling(): Observable<Billing>;

    addBilling(billing: Billing, method: any): Observable<Billing>;

    updateBilling(billingId: string, billing: Billing, method: any): Observable<number>;

}