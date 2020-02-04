import {RepositoryKind} from "../../repository.kind";
import {AssetCharacteristicTypeDataProvider} from "../../port/asset.characteristic.type.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetCharacteristicTypeDataProvider} from "./rest/rest.asset.characteristic.type.data.provider";
import {NedbAssetCharacteristicTypeDataProvider} from "./db/nedb.asset.characteristic.type.data.provider";

export function createAssetCharacteristicTypeDataProvider(kind?: RepositoryKind): AssetCharacteristicTypeDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetCharacteristicTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetCharacteristicTypeDataProvider();
    default:
      throw new Error(`Unknown Asset Characteristic Type Data Provider ${k}`);
  }

}