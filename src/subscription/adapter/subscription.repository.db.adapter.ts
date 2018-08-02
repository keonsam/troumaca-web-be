import { SubscriptionRepository } from "../subscription.repository";
import { Observable } from "rxjs/Observable";
import { Subscription } from "../subscription";
import { Observer } from "rxjs/Observer";
import { subscriptions } from "../../db";
import { generateUUID } from "../../uuid.generator";

export class SubscriptionRepositoryNeDbAdapter implements SubscriptionRepository {

    public getSubscription(type: string): Observable<Subscription> {
        return Observable.create(function (observer: Observer<Subscription>) {
            const query = {
                "type": type
            };
            subscriptions.findOne(query, function (err: any, doc: any) {
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