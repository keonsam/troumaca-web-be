import { SubscriptionRepository } from "../../repository/subscription.repository";
import { Subscription } from "../../data/party/subscription";
import { Observable, Observer, of, throwError } from "rxjs";
import { App } from "../../data/party/app";
import { apps } from "../../data/party/apps";
import { Billing } from "../../data/party/billing";

export class SubscriptionRepositoryNeDbAdapter implements SubscriptionRepository {

    getApps(partyId: any): Observable<App[]> {
        return of(apps);
    }

    private getSubscriptionsLocal(partyId: string): Observable<Subscription[]> {
        return undefined;
    }

    getSubscriptions(partyId: string): Observable<Subscription[]> {
        return undefined;
    }

    public addSubscription(subscription: Subscription, partyId: string): Observable<Subscription> {
        return undefined;
    }

    private addSubscriptionLocal(subscription: Subscription, partyId: string): Observable<Subscription> {
        return undefined;
    }

    private generateBilling(subscription: Subscription, app: App): Observable<Billing> {
        return undefined;
    }

    deleteSubscription(subscriptionId: string, partyId: string): Observable<number> {
        return undefined;
    }
}
