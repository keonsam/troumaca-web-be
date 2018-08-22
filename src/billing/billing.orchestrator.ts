import { Observable } from "rxjs";
import { Billing } from "./billing";
import { createBillingRepositoryFactory } from "./billing.repository.factory";
import { BillingRepository } from "./billing.repository";

export class  BillingOrchestrator {
    private billingRepository: BillingRepository;
    constructor() {
        this.billingRepository = createBillingRepositoryFactory();
    }

    public getBilling(): Observable<Billing> {
        return this.billingRepository.getBilling();
    }

    public addBilling(billing: Billing, method: any): Observable<Billing> {
        return this.billingRepository.addBilling(billing, method);
    }

    public updateBilling(billingId: string, billing: Billing, method: any): Observable<number> {
        return this.billingRepository.updateBilling(billingId, billing, method);
    }

    // CREDIT CARD

    public cardName(value: string): Observable<boolean> {
        return this.billingRepository.cardName(value);
    }

    public cardNumber(value: string): Observable<boolean> {
        return this.billingRepository.cardNumber(value);
    }

    public cardExpDate(value: Date): Observable<boolean> {
        return this.billingRepository.cardExpDate(value);
    }

    public cardCVV(value: string): Observable<boolean> {
        return this.billingRepository.cardName(value);
    }
}