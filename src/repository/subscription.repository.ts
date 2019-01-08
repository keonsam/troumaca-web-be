import { Subscription } from "../data/party/subscription";
import { Observable } from "rxjs";
import { App } from "../data/party/app";

export interface SubscriptionRepository {

    getApps(partyId: any): Observable<App[]>;
    getSubscriptions(partyId: string): Observable<Subscription[]>;
    addSubscription(subscription: Subscription, partyId: string): Observable<Subscription>;
    deleteSubscription(subscriptionId: string, partyId: string): Observable<number>;
}