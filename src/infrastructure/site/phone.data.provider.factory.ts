import {RepositoryKind} from "../../repository.kind";
import {NedbPhoneDataProvider} from "./db/nedb.phone.data.provider";
import {RestPhoneDataProvider} from "./rest/rest.phone.data.provider";
import {properties} from "../../properties.helpers";
import {PhoneDataProvider} from "../../port/phone.data.provider";


export function createPhoneDataProvider(kind?: RepositoryKind): PhoneDataProvider {
  const type: number = properties.get("site.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbPhoneDataProvider();
    case RepositoryKind.Rest:
      return new RestPhoneDataProvider();
    default:
      throw new Error(`Unknown Phone Data Provider ${k}`);

  }
}
