import { SubscriptionRepository } from "../../repository/subscription.repository";
import { Subscription } from "../../data/party/subscription";
import { Observable ,  Observer, of } from "rxjs";
import { subscriptions } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { Module } from "../../data/party/module";
import { switchMap } from "rxjs/operators";
import { modules } from "../../data/party/modules";

export class SubscriptionRepositoryNeDbAdapter implements SubscriptionRepository {

    getSubscriptionModules(): Observable<Module[]> {
        return this.getSubscriptionsLocal()
            .pipe( switchMap( subscriptionArr => {
                if (!subscriptionArr) {
                    return of(modules);
                } else {
                    subscriptionArr.forEach(x => {
                       modules.find(v => v.moduleId === x.moduleId).subscribed = true;
                    });
                    return of(modules);
                }
            }));
    }

    private getSubscriptionsLocal(): Observable<Subscription[]> {
        return Observable.create( (observer: Observer<Subscription[]>) => {
            subscriptions.find({}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    public addSubscription(subscription: Subscription): Observable<Subscription> {
        return Observable.create(function (observer: Observer<Subscription>) {
            subscription.subscriptionId = generateUUID();
            subscription.subscribed = true;

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
}