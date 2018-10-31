import {BillingRepository} from "../../repository/billing.repository";
import {Observable, Observer, of} from "rxjs";
import {billings, creditCards, paymentMethods} from "../../db";
import {generateUUID} from "../../uuid.generator";
import {PaymentMethod} from "../../billing/payment.method";
import {error} from "util";
import {CreditCard} from "../../billing/credit.card";
import {Billing} from "../../billing/billing";
import {map, switchMap} from "rxjs/operators";

export class BillingRepositoryNeDbAdapter implements BillingRepository {

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

  addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    creditCard.creditCardId = generateUUID();
    creditCard.status = "primary";
    return this.addCreditCardLocal(creditCard)
      .pipe(switchMap(newDoc => {
        if (newDoc) {
          return this.updateCreditCardState([creditCard.creditCardId], "inactive")
            .pipe(map(numReplaced => {
              return newDoc;
            }));
        } else {
          return of(undefined);
        }
      }));
  }

  updateCreditCardState(creditCardId: string[], status: string): Observable<number> {
    return Observable.create((observer: Observer<number>) => {
      const query = {creditCardId: {$nin: creditCardId}};
      creditCards.update(query, {$set: {status: status}}, {multi: true}, (err, numReplaced) => {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getBillings(): Observable<Billing[]> {
    return Observable.create((observer: Observer<Billing[]>) => {
      billings.find({}, (err: any, doc: any) => {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(error);
        }
        observer.complete();
      });
    });
  }

  getCreditCards(): Observable<CreditCard[]> {
    return Observable.create((observer: Observer<CreditCard[]>) => {
      creditCards.find({}, (err: any, doc: any) => {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(error);
        }
        observer.complete();
      });
    });
  }

  updateCreditCard(creditCard: CreditCard, creditCardId: string): Observable<number> {
    return this.updateCreditCardLocal(creditCard, creditCardId)
      .pipe(switchMap(num => {
        if (!num || creditCard.status !== "primary") {
          return of(num);
        } else {
          return this.updateCreditCardState([creditCardId], "inactive");
        }
      }));
  }

  updateCreditCardLocal(creditCard: CreditCard, creditCardId: string): Observable<number> {
    const query = {
      "creditCardId": creditCardId
    };
    return Observable.create((observer: Observer<number>) => {
      creditCards.update(query, creditCard, {}, (err: any, numUpdated: any) => {
        if (!err) {
          observer.next(numUpdated);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteCreditCard(creditCardId: string): Observable<number> {
    const query = {
      "creditCardId": creditCardId
    };
    return Observable.create((observer: Observer<number>) => {
      creditCards.remove(query, {}, (err: any, numReplaced: any) => {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  public cardName(value: string): Observable<boolean> {
    return of(true);
  }

  // public getBilling(): Observable<Billing> {
  //     return Observable.create(function (observer: Observer<Billing>) {
  //         // const query = {
  //         //     "type": type
  //         // };
  //         billings.findOne({}, function (err: any, doc: any) {
  //             if (!err) {
  //                 observer.next(doc);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }
  //
  // public addBilling(billing: Billing, method: any): Observable<Billing> {
  //     return Observable.create(function (observer: Observer<Billing>) {
  //
  //         method.methodId = generateUUID();
  //         billing.billingId = generateUUID();
  //         billing.methodId = method.methodId;
  //         billing.confirmed = true;
  //         payMethods.insert(method, function (err: any, doc: any) {
  //             if (!err) {
  //                 billings.insert(billing, function (err: any, doc2: any) {
  //                     if (!err) {
  //                         observer.next(doc2);
  //                     } else {
  //                         observer.error(err);
  //                     }
  //                     observer.complete();
  //                 });
  //             } else {
  //                 observer.error(err);
  //                 observer.complete();
  //             }
  //         });
  //     });
  // }
  //
  // public updateBilling(billingId: string, billing: Billing, method: any): Observable<number> {
  //     return Observable.create(function (observer: Observer<number>) {
  //         const query = {
  //           "billingId": billingId
  //         };
  //
  //
  //         method.methodId = generateUUID();
  //         billing.methodId = method.methodId;
  //         billing.confirmed = true;
  //         payMethods.insert(method, function (err: any, doc: any) {
  //             if (!err) {
  //                 billings.update(query, billing, {}, function (err: any, numReplaced:any) {
  //                     if (!err) {
  //                         observer.next(numReplaced);
  //                     } else {
  //                         observer.error(err);
  //                     }
  //                     observer.complete();
  //                 });
  //             } else {
  //                 observer.error(err);
  //                 observer.complete();
  //             }
  //         });
  //     });
  // }

  // CREDIT CARD

  public cardNumber(value: string): Observable<boolean> {
    return of(true);
  }

  public cardExpDate(value: Date): Observable<boolean> {
    return of(true);
  }

  public cardCVV(value: string): Observable<boolean> {
    return of(true);
  }

  private addCreditCardLocal(creditCard: CreditCard): Observable<CreditCard> {
    return Observable.create((observer: Observer<CreditCard>) => {
      creditCards.insert(creditCard, (err: any, doc: any) => {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}