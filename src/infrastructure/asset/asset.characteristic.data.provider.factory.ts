import {RepositoryKind} from "../../repository.kind";
import {AssetCharacteristicDataProvider} from "../../port/asset.characteristic.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetCharacteristicDataProvider} from "./rest/rest.asset.characteristic.data.provider";
import {NedbAssetCharacteristicDataProvider} from "./db/nedb.asset.characteristic.data.provider";

export function createAssetCharacteristicDataProvider(kind?: RepositoryKind): AssetCharacteristicDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetCharacteristicDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetCharacteristicDataProvider();
    default:
      throw new Error(`Unknown Asset Characteristic Data Provider ${k}`);
  }

}