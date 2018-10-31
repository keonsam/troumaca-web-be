import { Observable } from "rxjs";
import { PaymentMethod } from "../data/party/payment.method";
import { Billing } from "../data/party/billing";
import { PaymentInformation } from "../data/party/payment.information";

export interface BillingRepository {

    getPaymentMethods(): Observable<PaymentMethod[]>;

    addPaymentInformation(paymentInformation: PaymentInformation, partyId: string): Observable<PaymentInformation>;

    getBillings(partyId: string): Observable<Billing[]>;

    getPaymentInformation(partyId: string): Observable<PaymentInformation[]>;

    updatePaymentInformation(paymentInformation: PaymentInformation, paymentId: string): Observable<number>;

    deletePaymentInformation(paymentId: string): Observable<number>;

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

    isValidPaymentMethod(partyId: string): Observable<boolean>;
}