import {SubscriptionRepository} from "../../repository/subscription.repository";
import {Subscription} from "../../data/party/subscription";
import {Observable} from "rxjs";
import {Module} from "../../data/party/module";

export class SubscriptionRepositoryRestAdapter implements SubscriptionRepository {

  getSubscriptionModules(): Observable<Module[]> {
    return undefined;
  }

  public addSubscription(subscription: Subscription): Observable<Subscription> {
    return undefined;
  }
}