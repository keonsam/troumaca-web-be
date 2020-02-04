import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {BrandDataProvider} from "../../port/brand.data.provider";
import {NedbBrandDataProvider} from "./db/nedb.brand.data.provider";
import {RestBrandDataProvider} from "./rest/rest.brand.data.provider";


export function createBrandDataProvider(kind?: RepositoryKind): BrandDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbBrandDataProvider();
    case RepositoryKind.Rest:
      return new RestBrandDataProvider();
    default:
      throw new Error(`Unknown Brand Data Provider ${k}`);
  }
}
