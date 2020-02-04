import {AssetTypeDataProvider} from "../../port/asset.type.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbAssetTypeDataProvider} from "./db/nedb.asset.type.data.provider";
import {RestAssetTypeDataProvider} from "./rest/rest.asset.type.data.provider";

// import {AssetSpecificationRepository} from "../../repository/asset.specification.data.provider";
// import {NedbAssetSpecificationDataProvider} from "./db/nedb.asset.specification.data.provider";
// import {OtherAssetTypeRepository} from "../../repository/other.asset.type.data.provider";
// import {NedbOtherAssetTypeDataProvider} from "./db/other.asset.type.data.provider";

export function createAssetTypeDataProvider(kind?: RepositoryKind): AssetTypeDataProvider {
  const type: number = properties.get("asset.type.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      // let assetSpecificationRepository: AssetSpecificationRepository = new NedbAssetSpecificationDataProvider();
      // let otherAssetTypeRepository: OtherAssetTypeRepository = new NedbOtherAssetTypeDataProvider();
      return new NedbAssetTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetTypeDataProvider();
    default:
      throw new Error(`Unknown Asset Type Data Provider ${k}`);

  }
}
