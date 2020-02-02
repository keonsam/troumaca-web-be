import {SiteDataProvider} from "../../port/site.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbSiteDataProvider} from "./db/nedb.site.data.provider";
import {RestSiteDataProvider} from "./rest/rest.site.data.provider";
import {properties} from "../../properties.helpers";


export function createSiteDataProvider(kind?: RepositoryKind): SiteDataProvider {
  const type: number = properties.get("site.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbSiteDataProvider();
    case RepositoryKind.Rest:
      return new RestSiteDataProvider();
    default:
      throw new Error(`Unknown Site Repository Type ${k}`);

  }
}
