import {RepositoryKind} from "../../repository.kind";
import {NedbWebSiteDataProvider} from "./db/nedb.web.site.data.provider";
import {RestWebSiteDataProvider} from "./rest/rest.web.site.data.provider";
import {properties} from "../../properties.helpers";
import {WebSiteDataProvider} from "../../port/web.site.data.provider";


export function createWebSiteDataProvider(kind?: RepositoryKind): WebSiteDataProvider {
  const type: number = properties.get("site.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbWebSiteDataProvider();
    case RepositoryKind.Rest:
      return new RestWebSiteDataProvider();
    default:
      throw new Error(`Unknown Email Data Provider ${k}`);

  }
}
