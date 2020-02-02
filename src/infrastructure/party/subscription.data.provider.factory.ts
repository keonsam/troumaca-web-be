import {properties} from "../../properties.helpers";
import {RepositoryKind} from "../../repository.kind";
import {SubscriptionDataProvider} from "../../port/subscription.data.provider";
import {NedbSubscriptionDataProvider} from "./db/nedb.subscription.data.provider";
import {RestSubscriptionDataProvider} from "./rest/rest.subscription.data.provider";

export function createSubscriptionRepositoryFactory(kind?: RepositoryKind): SubscriptionDataProvider {
  const type: number = properties.get("subscription.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbSubscriptionDataProvider();
    case RepositoryKind.Rest:
      return new RestSubscriptionDataProvider();
    default:
      throw new Error(`Unknown Subscription Data Provider ${k}`);
  }
}