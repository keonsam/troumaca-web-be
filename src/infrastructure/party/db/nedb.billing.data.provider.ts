import { BillingDataProvider } from "../../../port/billing.data.provider";
import { Observable, Observer, of, throwError } from "rxjs";
import { billings, paymentInformation, paymentMethods } from "../../../db";
import { generateUUID } from "../../../uuid.generator";
import { PaymentMethod } from "../../../domain/model/payment/payment.method";
import { error } from "util";
import { Billing } from "../../../domain/model/payment/billing";
import { map, switchMap } from "rxjs/operators";
import { PaymentInformation } from "../../../domain/model/payment/payment.information";

export class NedbBillingDataProvider implements BillingDataProvider {

    getPaymentMethods(): Observable<PaymentMethod[]> {
        return Observable.create((observer: Observer<PaymentMethod[]>) => {
            paymentMethods.find({}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(error);
                }
                observer.complete();
            });
        });
    }

    getBillings(partyId: string): Observable<Billing[]> {
        return Observable.create((observer: Observer<Billing[]>) => {
            billings.find({partyId}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(error);
                }
                observer.complete();
            });
        });
    }

    addPaymentInformation(paymentInfo: PaymentInformation, partyId: string): Observable<PaymentInformation> {
        paymentInfo.paymentId = generateUUID();
        paymentInfo.partyId = partyId;
        paymentInfo.status = "primary";
        paymentInfo.createdOn = new Date();
        paymentInfo.modifiedOn = new Date();
        return this.addPaymentInformationLocal(paymentInfo)
            .pipe(switchMap(newDoc => {
                if (!newDoc) {
                    return throwError(`Failed to add credit Card Info ${newDoc}`);
                } else {
                    return this.updatePaymentInformationState(partyId, newDoc.paymentId, "inactive")
                        .pipe(map(numReplaced => {
                            return newDoc;
                        }));
                }
            }));
    }

    private updatePaymentInformationState(partyId: string, paymentId: string, status: string): Observable<number> {
        // TODO: you can update this to check to see if anything is available to update
        return Observable.create((observer: Observer<number>) => {
            const query = {partyId, paymentId: {$ne: paymentId}};
            paymentInformation.update(query, {$set: {status: status, modifiedOn: new Date()}}, {multi: true}, (err, numReplaced) => {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private addPaymentInformationLocal(paymentInfo: PaymentInformation): Observable<PaymentInformation> {
        return Observable.create((observer: Observer<PaymentInformation>) => {
            paymentInformation.insert(paymentInfo, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getPaymentInformation(partyId: string): Observable<PaymentInformation[]> {
        return this.getPaymentInformationLocal(partyId)
            .pipe( switchMap( paymentInfo => {
                if (!paymentInfo) {
                    return of(paymentInfo);
                } else {
                    return this.getPaymentMethods()
                        .pipe( map( methods => {
                            if (!methods) {
                                throw new Error(`Failed to get payment methods ${methods}`);
                            } else {
                                paymentInfo.forEach( x => {
                                    x.method = methods.find(v => v.paymentMethodId === x.paymentMethodId).name;
                                    if (x.paymentMethodId === "9f9e5106-1235-4f61-9609-b8fea945e066") {
                                        x.ending = x.cardNumber.slice(-4);
                                    }
                                });
                                return paymentInfo;
                            }
                        }));
                }
        }));
    }

    private getPaymentInformationLocal(partyId: string): Observable<PaymentInformation[]> {
        return Observable.create((observer: Observer<PaymentInformation[]>) => {
            paymentInformation.find({partyId}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(error);
                }
                observer.complete();
            });
        });
    }

    updatePaymentInformation(paymentInfo: PaymentInformation, paymentId: string): Observable<number> {
        paymentInfo.modifiedOn = new Date();
        return Observable.create((observer: Observer<number>) => {
            paymentInformation.update({paymentId}, paymentInfo, {}, (err: any, numUpdated: any) => {
                if (!err) {
                    observer.next(numUpdated);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deletePaymentInformation(paymentId: string): Observable<number> {
        const query = {
            paymentId
        };
        return Observable.create((observer: Observer<number>) => {
            paymentInformation.remove(query, {}, (err: any, numReplaced: any) => {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // CREDIT CARD

    public cardName(value: string): Observable<boolean> {
        return of(true);
    }

    public cardNumber(value: string): Observable<boolean> {
        return of(true);
    }

    public cardExpDate(value: Date): Observable<boolean> {
        return of(true);
    }

    public cardCVV(value: string): Observable<boolean> {
        return of(true);
    }

    isValidPaymentMethod(partyId: string): Observable<boolean> {
        return Observable.create((observer: Observer<Billing[]>) => {
            paymentInformation.findOne({partyId}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(error);
                }
                observer.complete();
            });
        });
    }
}