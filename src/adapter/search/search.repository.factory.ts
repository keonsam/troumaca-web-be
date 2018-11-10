import {properties} from "../../properties.helpers";
import {RepositoryKind} from "../../repository.kind";
import {SearchRepository} from "../../repository/search.repository";
import {SearchRepositoryNeDbAdapter} from "./search.repository.db.adapter";
import {SearchRepositoryRestAdapter} from "./search.repository.rest.adapter";

export function createSearchRepositoryFactory(kind?: RepositoryKind): SearchRepository {
  const type: number = properties.get("search.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new SearchRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new SearchRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Search Repository Type ${k}`);
  }
}