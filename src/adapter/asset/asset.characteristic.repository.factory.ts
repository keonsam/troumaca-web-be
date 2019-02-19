import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AssetCharacteristicRepository} from "../../repository/asset.characteristic.repository";
import {AssetCharacteristicRepositoryDbAdapter} from "./asset.characteristic.repository.db.adapter";
import {AssetCharacteristicRepositoryRestAdapter} from "./asset.characteristic.repository.rest.adapter";


export function createAssetCharacteristicRepositoryFactory(kind?: RepositoryKind): AssetCharacteristicRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetCharacteristicRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new AssetCharacteristicRepositoryRestAdapter();
    default:
      throw new Error(`Unknown AssetCharacteristic Repository Type ${k}`);
  }
}
