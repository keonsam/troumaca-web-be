import { createBillingRepositoryFactory } from "../adapter/party/billing.repository.factory";
import { BillingRepository } from "../repository/billing.repository";
import { Observable } from "rxjs";
import { PaymentMethod } from "./payment.method";
import { CreditCard } from "./credit.card";
import { Billing } from "./billing";
import { map } from "rxjs/operators";

export class  BillingOrchestrator {
    private billingRepository: BillingRepository;
    constructor() {
        this.billingRepository = createBillingRepositoryFactory();
    }

    getPaymentMethods(): Observable<PaymentMethod[]> {
        return this.billingRepository.getPaymentMethods();
    }

    addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
        return this.billingRepository.addCreditCard(creditCard);
    }

    getBillings(): Observable<Billing[]> {
        return this.billingRepository.getBillings();
    }

    getCreditCards(): Observable<CreditCard[]> {
        return this.billingRepository.getCreditCards()
            .pipe( map(creditCards => {
                if (creditCards) {
                    creditCards.forEach(x => {
                        x.ending = x.cardNumber.slice(-4);
                    });
                }
                return creditCards;
            }));
    }

    updateCreditCard(creditCard: CreditCard, creditCardId: string): Observable<number> {
        return this.billingRepository.updateCreditCard(creditCard, creditCardId);
    }

    deleteCreditCard(creditCardId: string): Observable<number> {
        return this.billingRepository.deleteCreditCard(creditCardId);
    }

    // public getBilling(): Observable<Billing> {
    //     return this.billingRepository.getBilling();
    // }
    //
    // public addBilling(billing: Billing, method: any): Observable<Billing> {
    //     return this.billingRepository.addBilling(billing, method);
    // }
    //
    // public updateBilling(billingId: string, billing: Billing, method: any): Observable<number> {
    //     return this.billingRepository.updateBilling(billingId, billing, method);
    // }

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