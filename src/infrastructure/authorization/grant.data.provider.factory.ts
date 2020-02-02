import {GrantDataProvider} from "../../port/grant.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbGrantDataProvider} from "./db/nedb.crant.data.provider";
import {RestGrantDataProvider} from "./rest/rest.crant.data.provider";

export function createGrantDataProvider(kind?: RepositoryKind): GrantDataProvider {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new NedbGrantDataProvider();
    case RepositoryKind.Rest:
      return new RestGrantDataProvider();
    default:
      throw new Error(`Unknown Grant Data Provider ${kind}`);
  }
}

