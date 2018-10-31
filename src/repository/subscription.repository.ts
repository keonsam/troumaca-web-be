import { Subscription } from "../data/party/subscription";
import { Observable } from "rxjs";
import { App } from "../data/party/app";

export interface SubscriptionRepository {

    getApps(partyId: string): Observable<App[]>;
    getSubscriptions(partyId: string): Observable<Subscription[]>;
    addSubscription(subscription: Subscription, partyId: string): Observable<Subscription>;
}