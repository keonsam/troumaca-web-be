import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {BrandRepository} from "../../repository/brand.repository";
import {BrandRepositoryDbAdapter} from "./brand.repository.db.adapter";
import {BrandRepositoryRestAdapter} from "./brand.repository.rest.adapter";


export function createBrandRepositoryFactory(kind?: RepositoryKind): BrandRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new BrandRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new BrandRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Brand Repository Type ${k}`);
  }
}
