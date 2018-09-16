import { BillingRepository } from "../../repository/billing.repository";
import { Billing } from "../../data/party/billing";
import { Observable } from "rxjs";

export class BillingRepositoryRestAdapter implements BillingRepository {
    public getBilling(): Observable<Billing> {
        return undefined;
    }

    public addBilling(billing: Billing, method: any): Observable<Billing> {
        return undefined;
    }

    public updateBilling(billingId: string, billing: Billing, method: any): Observable<number> {
        return undefined;
    }

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