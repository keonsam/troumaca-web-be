import { properties } from "../properties.helpers";
import { RepositoryKind } from "../repository.kind";
import { SubscriptionRepository } from "./subscription.repository";
import { SubscriptionRepositoryNeDbAdapter } from "./adapter/subscription.repository.db.adapter";
import { SubscriptionRepositoryRestAdapter } from "./adapter/subscription.repository.rest.adapter";

export function createSubscriptionRepositoryFactory(kind?: RepositoryKind): SubscriptionRepository {
    const type: number = properties.get("subscription.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

    switch (k) {
        case RepositoryKind.Nedb:
            return new SubscriptionRepositoryNeDbAdapter();
        case RepositoryKind.Rest:
            return new SubscriptionRepositoryRestAdapter();
        default:
            throw new Error(`Unknown Subscription Repository Type ${k}`);
    }
}