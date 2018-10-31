import { BillingRepository } from "../../repository/billing.repository";
import { Observable } from "rxjs";
import { PaymentMethod } from "../../data/party/payment.method";
import { Billing } from "../../data/party/billing";
import { PaymentInformation } from "../../data/party/payment.information";

export class BillingRepositoryRestAdapter implements BillingRepository {

    getBillings(partyId: string): Observable<Billing[]> {
        return undefined;
    }

    getPaymentMethods(): Observable<PaymentMethod[]> {
        return undefined;
    }

    addPaymentInformation(paymentInfo: PaymentInformation, partyId: string): Observable<PaymentInformation> {
        return undefined;
    }

    getPaymentInformation(partyId: string): Observable<PaymentInformation[]> {
        return undefined;
    }

    updatePaymentInformation(paymentInfo: PaymentInformation, creditCardId: string): Observable<number> {
        return undefined;
    }

    deletePaymentInformation(creditCardId: string): Observable<number> {
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

    isValidPaymentMethod(partyId: string): Observable<boolean> {
        return undefined;
    }
}