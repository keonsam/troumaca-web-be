import {Subscription} from "../data/party/subscription";
import {Observable} from "rxjs";
import {Module} from "../data/party/module";

export interface SubscriptionRepository {

  getSubscriptionModules(): Observable<Module[]>;

  addSubscription(subscription: Subscription): Observable<Subscription>;


}