import {SiteRepository} from "../../repository/site.repository";
import {RepositoryKind} from "../../repository.kind";
import {SiteRepositoryNeDbAdapter} from "./site.repository.db.adapter";
import {SiteRepositoryRestAdapter} from "./site.repository.rest.adapter";
import {properties} from "../../properties.helpers";


export function createSiteRepository(kind?: RepositoryKind): SiteRepository {
  const type: number = properties.get("site.repository.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new SiteRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new SiteRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Site Repository Type ${k}`);

  }
}
