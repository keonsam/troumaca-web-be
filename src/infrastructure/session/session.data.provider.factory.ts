import {SessionDataProvider} from "../../port/session.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbSessionDataProvider} from "./nedb.session.data.provider";
import {RestSessionDataProvider} from "./rest.session.data.provider";

export function createSessionDataProvider(kind?: RepositoryKind): SessionDataProvider {
  const type: number = properties.get("session.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbSessionDataProvider();
    case RepositoryKind.Rest:
      return new RestSessionDataProvider();
    default:
      throw new Error(`Unknown Session Repository Type ${k}`);
  }
}
