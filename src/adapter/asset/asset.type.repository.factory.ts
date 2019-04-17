import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetTypeRepositoryNeDbAdapter} from "./db/asset.type.repository.db.adapter";
import {AssetTypeRepositoryRestAdapter} from "./rest/asset.type.repository.rest.adapter";
// import {AssetSpecificationRepository} from "../../repository/asset.specification.repository";
// import {AssetSpecificationRepositoryNeDbAdapter} from "./db/asset.specification.repository.db.adapter";
// import {OtherAssetTypeRepository} from "../../repository/other.asset.type.repository";
// import {OtherAssetTypeRepositoryNeDbAdapter} from "./db/other.asset.type.repository.db.adapter";

export function createAssetTypeRepository(kind?: RepositoryKind): AssetTypeRepository {
  const type: number = properties.get("asset.type.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      // let assetSpecificationRepository: AssetSpecificationRepository = new AssetSpecificationRepositoryNeDbAdapter();
      // let otherAssetTypeRepository: OtherAssetTypeRepository = new OtherAssetTypeRepositoryNeDbAdapter();
      return new AssetTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Type Repository Type ${k}`);

  }
}
