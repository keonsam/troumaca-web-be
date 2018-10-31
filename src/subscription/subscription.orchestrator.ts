import {Subscription} from "../data/party/subscription";
import {createSubscriptionRepositoryFactory} from "../adapter/party/subscription.repository.factory";
import {SubscriptionRepository} from "../repository/subscription.repository";
import {Observable} from "rxjs";
import {Module} from "../data/party/module";

export class SubscriptionOrchestrator {
  private subscriptionRepository: SubscriptionRepository;

  constructor() {
    this.subscriptionRepository = createSubscriptionRepositoryFactory();
  }

  public getSubscriptionModules(): Observable<Module[]> {
    return this.subscriptionRepository.getSubscriptionModules();
  }

  public addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionRepository.addSubscription(subscription);
  }

}