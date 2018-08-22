import { Observable } from "rxjs";
import { Subscription } from "./subscription";
import { createSubscriptionRepositoryFactory } from "./subscription.repository.factory";
import { SubscriptionRepository } from "./subscription.repository";

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