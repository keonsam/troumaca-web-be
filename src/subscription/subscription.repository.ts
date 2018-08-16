import { Observable } from "rxjs/Observable";
import { Subscription } from "./subscription";

export interface SubscriptionRepository {

    getSubscriptionInformation(): Observable<any>;

    getSubscription(type: string): Observable<Subscription>;

    addSubscription(subscription: Subscription): Observable<Subscription>;

}