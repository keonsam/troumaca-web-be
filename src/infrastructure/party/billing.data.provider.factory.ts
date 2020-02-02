import {properties} from "../../properties.helpers";
import {RepositoryKind} from "../../repository.kind";
import {BillingDataProvider} from "../../port/billing.data.provider";
import {NedbBillingDataProvider} from "./db/nedb.billing.data.provider";
import {RestBillingDataProvider} from "./rest/rest.billing.data.provider";

export function createBillingRepositoryFactory(kind?: RepositoryKind): BillingDataProvider {
  const type: number = properties.get("billing.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbBillingDataProvider();
    case RepositoryKind.Rest:
      return new RestBillingDataProvider();
    default:
      throw new Error(`Unknown Billing Data Provider ${k}`);
  }
}