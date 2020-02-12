import { SubscriptionDataProvider } from "../../../port/subscription.data.provider";
import { Subscription } from "../../../domain/model/party/subscription";
import { Observable, Observer, of, throwError } from "rxjs";
import { App } from "../../../domain/model/party/app";
import { apps } from "../../../domain/model/party/apps";
import { Billing } from "../../../domain/model/payment/billing";

export class NedbSubscriptionDataProvider implements SubscriptionDataProvider {

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
