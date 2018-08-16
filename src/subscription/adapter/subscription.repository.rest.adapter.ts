import { SubscriptionRepository } from "../subscription.repository";
import { Observable } from "rxjs/Observable";
import { Subscription } from "../subscription";

export class SubscriptionRepositoryRestAdapter implements SubscriptionRepository {

    public getSubscriptionInformation(): Observable<any> {
        return undefined;
    }

    public getSubscription(type: string): Observable<Subscription> {
        return undefined;
    }

    public addSubscription(subscription: Subscription): Observable<Subscription> {
        return undefined;
    }
}