import { properties } from "../properties.helpers";
import { RepositoryKind } from "../repository.kind";
import {BillingRepository} from "./billing.repository";
import {BillingRepositoryNeDbAdapter} from "./adapter/billing.repository.db.adapter";
import {BillingRepositoryRestAdapter} from "./adapter/billing.repository.rest.adapter";

export function createBillingRepositoryFactory(kind?:RepositoryKind):BillingRepository {
    let type:number = properties.get("billing.repository.type") as number;

    let k:RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

    switch (k) {
        case RepositoryKind.Nedb:
            return new BillingRepositoryNeDbAdapter();
        case RepositoryKind.Rest:
            return new BillingRepositoryRestAdapter();
        default:
            throw new Error(`Unknown Billing Repository Type ${k}`);
    }
}