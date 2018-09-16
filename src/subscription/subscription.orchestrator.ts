import { Subscription } from "../data/party/subscription";
import { createSubscriptionRepositoryFactory } from "../adapter/party/subscription.repository.factory";
import { SubscriptionRepository } from "../repository/subscription.repository";
import { Observable } from "rxjs";

export class  SubscriptionOrchestrator {
    private subscriptionRepository: SubscriptionRepository;
    constructor() {
        this.subscriptionRepository = createSubscriptionRepositoryFactory();
    }

    public getSubscriptionInformation(): Observable<any> {
        return this.subscriptionRepository.getSubscriptionInformation();
    }

    public getSubscription(type: string): Observable<Subscription> {
        return this.subscriptionRepository.getSubscription(type);
    }

    public addSubscription(subscription: Subscription): Observable<Subscription> {
        return this.subscriptionRepository.addSubscription(subscription);
    }

}