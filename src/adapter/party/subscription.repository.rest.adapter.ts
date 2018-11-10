import { SubscriptionRepository } from "../../repository/subscription.repository";
import { Subscription } from "../../data/party/subscription";
import { Observable } from "rxjs";
import { App } from "../../data/party/app";

export class SubscriptionRepositoryRestAdapter implements SubscriptionRepository {

    getApps(partyId: string): Observable<App[]> {
        return undefined;
    }

    getSubscriptions(partyId: string): Observable<Subscription[]> {
        return undefined;
    }

    public addSubscription(subscription: Subscription, partyId: string): Observable<Subscription> {
        return undefined;
    }

    deleteSubscription(subscriptionId: string, partyId: string): Observable<number> {
        return undefined;
    }
}