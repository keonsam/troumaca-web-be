import { Subscription } from "../../../domain/model/party/subscription";
import { createSubscriptionRepositoryFactory } from "../../../infrastructure/party/subscription.data.provider.factory";
import { SubscriptionDataProvider } from "../../../port/subscription.data.provider";
import { Observable } from "rxjs";
import { App } from "../../../domain/model/party/app";

export class  SubscriptionOrchestrator {
    private subscriptionRepository: SubscriptionDataProvider;
    constructor() {
        this.subscriptionRepository = createSubscriptionRepositoryFactory();
    }

    public getApps(partyId: any): Observable<App[]> {
        return this.subscriptionRepository.getApps(partyId);
    }

    getSubscriptions(partyId: string): Observable<Subscription[]> {
        return this.subscriptionRepository.getSubscriptions(partyId);
    }

    public addSubscription(subscription: Subscription, partyId: string): Observable<Subscription> {
        return this.subscriptionRepository.addSubscription(subscription, partyId);
    }

    deleteSubscription(subscriptionId: string, partyId: string): Observable<number> {
        return this.subscriptionRepository.deleteSubscription(subscriptionId, partyId);
    }

}