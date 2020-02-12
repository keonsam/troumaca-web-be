import { Observable } from "rxjs";
import { PaymentMethod } from "../domain/model/payment/payment.method";
import { Billing } from "../domain/model/payment/billing";
import { PaymentInformation } from "../domain/model/payment/payment.information";

export interface BillingDataProvider {

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