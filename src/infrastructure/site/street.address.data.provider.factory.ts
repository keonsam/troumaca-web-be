import {RepositoryKind} from "../../repository.kind";
import {NedbStreetAddressDataProvider} from "./db/nedb.street.address.data.provider";
import {RestStreetAddressDataProvider} from "./rest/rest.street.address.data.provider";
import {properties} from "../../properties.helpers";
import {StreetAddressDataProvider} from "../../port/street.address.data.provider";


export function createStreetAddressProvider(kind?: RepositoryKind): StreetAddressDataProvider {
  const type: number = properties.get("site.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbStreetAddressDataProvider();
    case RepositoryKind.Rest:
      return new RestStreetAddressDataProvider();
    default:
      throw new Error(`Unknown Email Data Provider ${k}`);

  }
}
