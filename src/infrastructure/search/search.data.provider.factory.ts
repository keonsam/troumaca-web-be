import {properties} from "../../properties.helpers";
import {RepositoryKind} from "../../repository.kind";
import {SearchDataProvider} from "../../port/search.data.provider";
import {NedbSearchDataProvider} from "./db/nedb.search.data.provider";
import {RestSearchDataProvider} from "./rest/rest.search.data.provider";

export function createSearchDataProvider(kind?: RepositoryKind): SearchDataProvider {
  const type: number = properties.get("search.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbSearchDataProvider();
    case RepositoryKind.Rest:
      return new RestSearchDataProvider();
    default:
      throw new Error(`Unknown Search Data Provider ${k}`);
  }
}