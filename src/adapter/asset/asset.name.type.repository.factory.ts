import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetNameTypeRepository} from "../../repository/asset.name.type.repository";
import {AssetNameTypeRepositoryDbAdapter} from "./asset.name.type.repository.db.adapter";
import {AssetNameTypeRepositoryRestAdapter} from "./asset.name.type.repository.rest.adapter";


export function createAssetNameTypeRepositoryFactory(kind?: RepositoryKind): AssetNameTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetNameTypeRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new AssetNameTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Name Type Repository Type ${k}`);
  }
}
