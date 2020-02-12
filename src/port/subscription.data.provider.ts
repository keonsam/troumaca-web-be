import { Subscription } from "../domain/model/party/subscription";
import { Observable } from "rxjs";
import { App } from "../domain/model/party/app";

export interface SubscriptionDataProvider {

    getApps(partyId: any): Observable<App[]>;
    getSubscriptions(partyId: string): Observable<Subscription[]>;
    addSubscription(subscription: Subscription, partyId: string): Observable<Subscription>;
    deleteSubscription(subscriptionId: string, partyId: string): Observable<number>;
}