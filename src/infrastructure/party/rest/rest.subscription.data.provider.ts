import { SubscriptionDataProvider } from "../../../port/subscription.data.provider";
import { Subscription } from "../../../domain/model/party/subscription";
import { Observable } from "rxjs";
import { App } from "../../../domain/model/party/app";

export class RestSubscriptionDataProvider implements SubscriptionDataProvider {

    getApps(partyId: any): Observable<App[]> {
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