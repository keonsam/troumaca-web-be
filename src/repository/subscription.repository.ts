import { Subscription } from "../data/party/subscription";
import { Observable } from "rxjs";

export interface SubscriptionRepository {

    getSubscriptionInformation(): Observable<any>;

    getSubscription(type: string): Observable<Subscription>;

    addSubscription(subscription: Subscription): Observable<Subscription>;

}