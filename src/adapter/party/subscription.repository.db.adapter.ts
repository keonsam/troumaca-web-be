import { SubscriptionRepository } from "../../repository/subscription.repository";
import { Subscription } from "../../data/party/subscription";
import { Observable, Observer, of, throwError } from "rxjs";
import { billings, subscriptions } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { switchMap, map } from "rxjs/operators";
import { App } from "../../data/party/app";
import { apps } from "../../data/party/apps";
import { Billing } from "../../data/party/billing";

export class SubscriptionRepositoryNeDbAdapter implements SubscriptionRepository {

    getApps(partyId: string): Observable<App[]> {
        return this.getSubscriptionsLocal(partyId)
            .pipe( switchMap( subscriptionArr => {
                if (!subscriptionArr) {
                    return of(apps);
                } else {
                    // the service will determine weather this is subscribed or not.
                    subscriptionArr.forEach(x => {
                       apps.find(v => v.moduleId === x.moduleId).subscribed = true;
                    });
                    return of(apps);
                }
            }));
    }

    private getSubscriptionsLocal(partyId: string): Observable<Subscription[]> {
        return Observable.create( (observer: Observer<Subscription[]>) => {
            subscriptions.find({partyId}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getSubscriptions(partyId: string): Observable<Subscription[]> {
        return this.getSubscriptionsLocal(partyId)
            .pipe( map( subscriptions => {
                if (subscriptions) {
                    subscriptions.forEach(x => {
                        x.cost = apps.find(v => v.moduleId === x.moduleId).price;
                        x.name = apps.find(v => v.moduleId === x.moduleId).name;
                    });
                }
                return subscriptions;
            }));
    }

    public addSubscription(subscription: Subscription, partyId: string): Observable<Subscription> {
        return this.addSubscriptionLocal(subscription, partyId)
            .pipe( switchMap(value => {
                if (!value) {
                    return throwError( `Failed to save subscription ${value}`);
                } else {
                    return this.generateBilling(value, apps.find(x => x.moduleId === value.moduleId))
                        .pipe( map( billing => {
                            if (!billing) {
                                throw new Error(` Failed to add billing ${billing}`);
                            } else {
                                return value;
                            }
                        }));
                }
            }));
    }

    private addSubscriptionLocal(subscription: Subscription, partyId: string): Observable<Subscription> {
        return Observable.create(function (observer: Observer<Subscription>) {
            subscription.subscriptionId = generateUUID();
            subscription.partyId = partyId;
            subscription.subscribed = true;
            subscription.createdOn = new Date();
            subscription.modifiedOn = new Date();

            subscriptions.insert(subscription, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private generateBilling(subscription: Subscription, app: App): Observable<Billing> {
        return Observable.create(function (observer: Observer<Billing>) {
            const billing = new Billing();
            billing.billingId = generateUUID();
            billing.partyId = subscription.partyId;
            billing.name = app.name;
            billing.description = `initial billing`;
            billing.amount = app.price;
            billing.createdOn = new Date();
            billing.modifiedOn = new Date();

            billings.insert(billing, function (err: any, doc: any) {
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