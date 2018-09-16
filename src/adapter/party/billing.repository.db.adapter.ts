import { BillingRepository } from "../../repository/billing.repository";
import { Billing } from "../../data/party/billing";
import { Observable ,  Observer, of } from "rxjs";
import { billings, payMethods } from "../../db";
import { generateUUID } from "../../uuid.generator";

export class BillingRepositoryNeDbAdapter implements BillingRepository {

    public getBilling(): Observable<Billing> {
        return Observable.create(function (observer: Observer<Billing>) {
            // const query = {
            //     "type": type
            // };
            billings.findOne({}, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    public addBilling(billing: Billing, method: any): Observable<Billing> {
        return Observable.create(function (observer: Observer<Billing>) {

            method.methodId = generateUUID();
            billing.billingId = generateUUID();
            billing.methodId = method.methodId;
            billing.confirmed = true;
            payMethods.insert(method, function (err: any, doc: any) {
                if (!err) {
                    billings.insert(billing, function (err: any, doc2: any) {
                        if (!err) {
                            observer.next(doc2);
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    public updateBilling(billingId: string, billing: Billing, method: any): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
              "billingId": billingId
            };


            method.methodId = generateUUID();
            billing.methodId = method.methodId;
            billing.confirmed = true;
            payMethods.insert(method, function (err: any, doc: any) {
                if (!err) {
                    billings.update(query, billing, {}, function (err: any, numReplaced:any) {
                        if (!err) {
                            observer.next(numReplaced);
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(err);
                    observer.complete();
                }
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
}