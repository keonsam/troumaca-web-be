import { createBillingRepositoryFactory } from "../adapter/party/billing.repository.factory";
import { BillingRepository } from "../repository/billing.repository";
import { Observable } from "rxjs";
import { PaymentMethod } from "../data/party/payment.method";
import { Billing } from "../data/party/billing";
import { PaymentInformation } from "../data/party/payment.information";

export class  BillingOrchestrator {
    private billingRepository: BillingRepository;
    constructor() {
        this.billingRepository = createBillingRepositoryFactory();
    }

    getBillings(partyId: string): Observable<Billing[]> {
        return this.billingRepository.getBillings(partyId);
    }

    getPaymentMethods(): Observable<PaymentMethod[]> {
        return this.billingRepository.getPaymentMethods();
    }

    addPaymentInformation(paymentInformation: PaymentInformation, partyId: string): Observable<PaymentInformation> {
        return this.billingRepository.addPaymentInformation(paymentInformation, partyId);
    }

    getPaymentInformation(partyId: string): Observable<PaymentInformation[]> {
        return this.billingRepository.getPaymentInformation(partyId);
    }

    updatePaymentInformation(paymentInformation: PaymentInformation, paymentId: string): Observable<number> {
        return this.billingRepository.updatePaymentInformation(paymentInformation, paymentId);
    }

    deletePaymentInformation(paymentId: string): Observable<number> {
        return this.billingRepository.deletePaymentInformation(paymentId);
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

    isValidPaymentMethod(partyId: string): Observable<boolean> {
        return this.billingRepository.isValidPaymentMethod(partyId);
    }
}