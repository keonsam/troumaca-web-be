import { Subscription } from "../data/party/subscription";
import { createSubscriptionRepositoryFactory } from "../adapter/party/subscription.repository.factory";
import { SubscriptionRepository } from "../repository/subscription.repository";
import { Observable } from "rxjs";
import { App } from "../data/party/app";

export class  SubscriptionOrchestrator {
    private subscriptionRepository: SubscriptionRepository;
    constructor() {
        this.subscriptionRepository = createSubscriptionRepositoryFactory();
    }

    public getApps(partyId: string): Observable<App[]> {
        return this.subscriptionRepository.getApps(partyId);
    }

    getSubscriptions(partyId: string): Observable<Subscription[]> {
        return this.subscriptionRepository.getSubscriptions(partyId);
    }

    public addSubscription(subscription: Subscription, partyId: string): Observable<Subscription> {
        return this.subscriptionRepository.addSubscription(subscription, partyId);
    }

}